import { useEffect, useRef, useState, useCallback } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import type { RoomState } from '../types/webcam';
import type { SignalData } from 'simple-peer';

export const useWebRTC = (localStream: MediaStream | null) => {
  const [roomState, setRoomState] = useState<RoomState>({
    roomId: null,
    isHost: false,
    remoteStream: null,
    connectionStatus: 'disconnected'
  });

  const peerRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<typeof Socket | null>(null);

  const createRoom = useCallback(() => {
    if (!localStream) return;
    
    const roomId = uuidv4();
    socketRef.current = io('http://localhost:3000');
    
    socketRef.current?.emit('create-room', roomId);
    
    setRoomState(prev => ({
      ...prev,
      roomId,
      isHost: true,
      connectionStatus: 'connecting'
    }));
  }, [localStream]);

  const joinRoom = useCallback((roomId: string) => {
    if (!localStream) return;
    
    socketRef.current = io('http://localhost:3000');
    
    socketRef.current?.emit('join-room', roomId);
    
    setRoomState(prev => ({
      ...prev,
      roomId,
      isHost: false,
      connectionStatus: 'connecting'
    }));
  }, [localStream]);

  useEffect(() => {
    if (!socketRef.current || !localStream) return;

    socketRef.current.on('user-joined', () => {
      const peer = new Peer({
        initiator: roomState.isHost,
        stream: localStream,
        trickle: false
      });

      peer.on('signal', (signal: SignalData) => {
        socketRef.current?.emit('signal', { signal, roomId: roomState.roomId });
      });

      peer.on('stream', (stream: MediaStream) => {
        setRoomState(prev => ({
          ...prev,
          remoteStream: stream,
          connectionStatus: 'connected'
        }));
      });

      peerRef.current = peer;
    });

    socketRef.current.on('signal', ({ signal }: { signal: any }) => {
      peerRef.current?.signal(signal as string | SignalData);
    });

    return () => {
      socketRef.current?.disconnect();
      peerRef.current?.destroy();
    };
  }, [localStream, roomState.isHost, roomState.roomId]);

  return {
    ...roomState,
    createRoom,
    joinRoom
  };
};