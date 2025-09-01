import { useState, useCallback, useEffect } from 'react';
import type { WebcamState, WebcamError } from '../types/webcam';

export const useWebcam = () => {
  const [state, setState] = useState<WebcamState>({
    isActive: false,
    error: null,
    stream: null,
  });

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30 }
        }
      });
      
      setState(prev => ({
        ...prev,
        isActive: true,
        stream,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isActive: false,
        error: {
          name: 'Camera Error',
          message: error instanceof Error ? error.message : 'Failed to access camera'
        }
      }));
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach(track => track.stop());
      setState(prev => ({
        ...prev,
        isActive: false,
        stream: null
      }));
    }
  }, [state.stream]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    isActive: state.isActive,
    error: state.error,
    stream: state.stream,
    startWebcam,
    stopWebcam
  };
};