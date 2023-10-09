import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { IcCoreChar } from '@/public/assets/icons';

interface WebRTCVideoProps {
  roomId: string;
  // memberId: string;
  nickname: string;
  mediaStream: MediaStream | undefined;
  isSelected: boolean;
  captureTime: number;
  setCapturedImageFile: Dispatch<SetStateAction<File | undefined>>;
  onClick: () => void;
}

const WebRTCVideo = ({
  roomId,
  // memberId,
  nickname,
  mediaStream,
  isSelected,
  captureTime,
  setCapturedImageFile,
  onClick,
}: WebRTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  const captureAndSaveVideoFrame = () => {
    if (!viewRef.current) return null;

    const canvas = document.createElement('canvas');
    canvas.width = viewRef.current.videoWidth;
    canvas.height = viewRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(viewRef.current, 0, 0, canvas.width, canvas.height);

    const imageURL = canvas.toDataURL('image/png');
    const byteString = atob(imageURL.split(',')[1]);
    const mimeString = imageURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], `${roomId}-${nickname}.png`, {
      type: mimeString,
    });

    setCapturedImageFile(file);
    return file;
  };

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  useEffect(() => {
    captureAndSaveVideoFrame();
  }, [captureTime]);

  return (
    <StVideoWrapper>
      <StVideo
        ref={viewRef}
        onClick={onClick}
        style={{
          minWidth: isSelected ? '60rem' : '30rem',
          maxWidth: isSelected ? '60rem' : '30rem',
          minHeight: isSelected ? '40rem' : '20rem',
          maxHeight: isSelected ? '40rem' : '20rem',
        }}
        autoPlay
        playsInline
      />
      <IcCoreChar />
      <StName>{nickname}</StName>
    </StVideoWrapper>
  );
};

export default WebRTCVideo;

const StVideoWrapper = styled.div`
  position: relative;
  display: flex;

  & > button {
    width: 60%;
    padding: 0.5rem 0;

    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StVideo = styled.video`
  min-width: 30rem;
  max-width: 30rem;
  min-height: 20rem;
  max-height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;

const StName = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 1rem;

  display: flex;
  align-items: center;
  padding: 0 1.5rem 0 1rem;

  width: fit-content;
  height: 2rem;

  border-radius: 0 1rem 1rem 0;
  background-color: ${({ theme }) => theme.colors.Yellow2};
  ${({ theme }) => theme.fonts.Body4};
`;
