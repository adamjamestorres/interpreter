'use client';

import { ReactNode, Suspense } from 'react';
import MeetProvider from '@/contexts/MeetProvider';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    meetingId: string;
  }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { meetingId } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeetProvider meetingId={meetingId}>{children}</MeetProvider>
    </Suspense>
  );
}
