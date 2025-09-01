import { FC } from 'react';
import { useWebcam } from '../../hooks/useWebcam';
import { useWebRTC } from '../../hooks/useWebRTC';

export const VideoCallUI: FC = () => {
  const { isActive, stream, startWebcam, stopWebcam } = useWebcam();
  const { roomId, remoteStream, createRoom } = useWebRTC(stream);

  const handleCopyInviteLink = async () => {
    if (roomId) {
      const inviteLink = `${window.location.origin}/room/${roomId}`;
      await navigator.clipboard.writeText(inviteLink);
      alert('Invite link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Start Camera Button */}
      <button
        onClick={() => isActive ? stopWebcam() : startWebcam()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isActive ? 'Stop Camera' : 'Start Camera'}
      </button>

      {/* Video Display */}
      {isActive && stream && (
        <div className="relative w-full max-w-2xl">
          <video
            autoPlay
            playsInline
            muted
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Invite Link Button - Only shows when camera is active and room isn't created yet */}
      {isActive && !roomId && (
        <button
          onClick={createRoom}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Invite Link
        </button>
      )}

      {/* Copy Link Button - Only shows when room is created */}
      {roomId && (
        <button
          onClick={handleCopyInviteLink}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Invite Link
        </button>
      )}

      {/* Remote Video - Only shows when someone joins */}
      {remoteStream && (
        <div className="relative w-full max-w-2xl mt-4">
          <video
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};