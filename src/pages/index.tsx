import { FC } from 'react';
import { VideoCallUI } from '../components/webcam/VideoCallUI';

const Home: FC = () => {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Video Chat</h1>
        <VideoCallUI />
      </div>
    </main>
  );
};

export default Home;