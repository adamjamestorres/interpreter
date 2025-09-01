import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  StreamCall,
  StreamTheme,
  Call,
  CallControls,
  SpeakerLayout,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useStream } from '@/contexts/StreamProvider';
import '@stream-io/video-react-sdk/dist/css/styles.css';

interface MeetingProps {
  meetingId: string;
}

export default function Meeting({ meetingId }: MeetingProps) {
  const router = useRouter();
  const { client, user } = useStream();
  const [call, setCall] = useState<Call | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client || !user) return;

    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const initCall = async () => {
      console.log('Initializing call...');
      try {
        // Check if we already have an active call
        if (call) {
          console.log('Call already exists, returning');
          return;
        }

        console.log('Creating new call instance...');
        // Create the call instance
        const newCall = client.call('default', meetingId);
        
        try {
          console.log('Attempting to join existing call...');
          // Try to join an existing call first
          await newCall.join({ create: false });
          console.log('Successfully joined existing call');
        } catch (error) {
          console.log('Failed to join existing call, attempting to create new one...');
          // If the call doesn't exist, create it
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying call creation (${retryCount}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            await newCall.join({ create: true });
          } else {
            throw new Error('Failed to join or create call after retries');
          }
        }

        setCall(newCall);
        setIsLoading(false);
      } catch (error) {
        console.error('Error joining call:', error);
        setError('Failed to join the meeting. Please try again later.');
        setIsLoading(false);
      }
    };

    initCall();

    return () => {
      if (call) {
        call.leave();
        setCall(null);
      }
    };
  }, [client, user, meetingId, router]);

  if (!client) {
    return <div className="flex items-center justify-center h-screen">Initializing video client...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-red-500">{error}</div>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!call || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div>Joining meeting...</div>
        </div>
      </div>
    );
  }

  return (
    <StreamTheme>
      <StreamCall call={call}>
        <div className="h-screen flex flex-col">
          <div className="flex-1 relative">
            <SpeakerLayout />
          </div>
          <div className="p-4 bg-gray-900">
            <CallControls />
            {/* Custom controls removed; CallControls renders its own controls */}
          </div>
        </div>
      </StreamCall>
    </StreamTheme>
  );
}
