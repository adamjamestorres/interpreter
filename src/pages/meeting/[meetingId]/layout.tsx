import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import MeetProvider from '@/contexts/MeetProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { meetingId } = router.query;

  return (
    <MeetProvider meetingId={meetingId as string}>
      {children}
    </MeetProvider>
  );
}
