export interface WebcamError {
  name: string;
  message: string;
}

export interface WebcamState {
  isActive: boolean;
  error: WebcamError | null;
  stream: MediaStream | null;
}

export interface WebcamControlProps {
  isActive: boolean;
  onToggle: () => void;
}

export interface WebcamContainerProps {
  width?: number;
  height?: number;
  frameRate?: number;
}

export interface RoomState {
  roomId: string | null;
  isHost: boolean;
  remoteStream: MediaStream | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export interface SignalData {
  type: string;
  sdp?: string;
  candidate?: RTCIceCandidate;
}