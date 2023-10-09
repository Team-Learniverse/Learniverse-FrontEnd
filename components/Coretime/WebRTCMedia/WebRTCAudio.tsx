import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface WebRTCAudioProps {
  mediaStream: MediaStream | undefined;
  ismuted: boolean;
}

const WebRTCAudio = ({ mediaStream, ismuted }: WebRTCAudioProps) => {
  const viewRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  return (
    <StAudioWrapper>
      <StAudio ref={viewRef} autoPlay muted={ismuted} />
    </StAudioWrapper>
  );
};

export default WebRTCAudio;

const StAudioWrapper = styled.div`
  display: none;
`;

const StAudio = styled.audio``;
