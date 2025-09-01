import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import Meeting from '@/components/meeting/Meeting';
import { nanoid } from 'nanoid';

export default function MeetingPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { meetingId } = router.query;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // If no meetingId is provided, create a new one
  if (!meetingId) {
    const newMeetingId = nanoid();
    router.replace(`/meeting/${newMeetingId}`);
    return null;
  }

  return (
    <div className="h-screen">
      <Meeting meetingId={meetingId as string} />
    </div>
  );
}
