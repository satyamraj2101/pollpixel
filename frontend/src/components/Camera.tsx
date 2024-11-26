// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\components\Camera.tsx
import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon } from 'lucide-react';

interface CameraProps {
  onCapture: (image: string) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="rounded-lg w-full max-w-md mx-auto"
      />
      <button
        onClick={capture}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors"
      >
        <CameraIcon size={24} />
      </button>
    </div>
  );
}