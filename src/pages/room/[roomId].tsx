import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWebcam } from '../../hooks/useWebcam';
import { useWebRTC } from '../../hooks/useWebRTC';
import { VideoCallUI } from '../../components/webcam/VideoCallUI';

const RoomPage: FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { isActive, startWebcam, stream } = useWebcam();
  const { joinRoom } = useWebRTC(stream);

  useEffect(() => {
    if (roomId && typeof roomId === 'string' && isActive) {
      joinRoom(roomId);
    }
  }, [roomId, isActive, joinRoom]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Join Call</h1>
        
        {!isActive && (
          <button
            onClick={startWebcam}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Start Camera
          </button>
        )}

        <VideoCallUI/>
      </div>
    </main>
  );
};

export default RoomPage;