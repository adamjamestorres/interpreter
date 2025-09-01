import { StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const StreamContext = createContext<{
  client: StreamVideoClient | null;
  user: User | null;
}>({
  client: null,
  user: null,
});

export const StreamProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isSignedIn } = useUser();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [streamUser, setStreamUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isSignedIn || !clerkUser) return;

    let currentClient: StreamVideoClient | null = null;

    const initStream = async () => {
      try {
        const user: User = {
          id: clerkUser.id,
          name: clerkUser.firstName || clerkUser.username || 'Anonymous',
          image: clerkUser.imageUrl,
        };

        // Create a token provider function that fetches a fresh token each time
        const tokenProvider = async () => {
          const response = await fetch('/api/stream-token');
          if (!response.ok) {
            throw new Error('Failed to get Stream token');
          }
          const { token } = await response.json();
          if (!token) {
            throw new Error('No token returned from Stream token endpoint');
          }
          return token;
        };

        // Initialize Stream client
        const streamClient = new StreamVideoClient({
          apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user,
          tokenProvider,
        });

        currentClient = streamClient;
        setClient(streamClient);
        setStreamUser(user);
      } catch (error) {
        console.error('Error connecting to Stream:', error);
      }
    };

    initStream();

    return () => {
      currentClient?.disconnectUser();
    };
  }, [clerkUser, isSignedIn]);

  return (
    <StreamContext.Provider value={{ client, user: streamUser }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};
