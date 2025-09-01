import { FC } from 'react';
import type { WebcamControlProps } from '../../types/webcam';

export const WebcamControl: FC<WebcamControlProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      type="button"
    >
      {isActive ? 'Stop Camera' : 'Start Camera'}
    </button>
  );
};