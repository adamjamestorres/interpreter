import { createContext, useContext, ReactNode } from 'react';
import { StreamProvider } from '../StreamProvider';

interface MeetContextType {
  // Add any meeting-specific context values here
  isInMeeting: boolean;
}

interface MeetContextType {
  isInMeeting: boolean;
  meetingId: string | null;
}

interface MeetProviderProps {
  children: ReactNode;
  meetingId?: string;
}

const defaultContext: MeetContextType = {
  isInMeeting: false,
  meetingId: null
};

const MeetContext = createContext<MeetContextType>(defaultContext);

export function MeetProvider({ children, meetingId }: MeetProviderProps) {
  const contextValue: MeetContextType = {
    isInMeeting: !!meetingId,
    meetingId: meetingId || null
  };

  return (
    <StreamProvider>
      <MeetContext.Provider value={contextValue}>
        {children}
      </MeetContext.Provider>
    </StreamProvider>
  );
}

export const useMeet = (): MeetContextType => {
  const context = useContext(MeetContext);
  if (!context) {
    throw new Error('useMeet must be used within a MeetProvider');
  }
  return context;
};

export default MeetProvider;
