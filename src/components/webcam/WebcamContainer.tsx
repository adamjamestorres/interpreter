import { FC, useRef } from 'react';
import Webcam from 'react-webcam';
import type { WebcamContainerProps } from '../../types/webcam';

export const WebcamContainer: FC<WebcamContainerProps> = ({
  width = 640,
  height = 480,
  frameRate = 30
}) => {
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width,
    height,
    frameRate: { ideal: frameRate },
    facingMode: "user"
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <Webcam
        ref={webcamRef}
        audio={false}
        width={width}
        height={height}
        videoConstraints={videoConstraints}
        className="w-full h-full object-cover"
        screenshotFormat="image/jpeg"
      />
    </div>
  );
};