import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { IcCoreChar } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { formatHHMMSS } from '@/utils/getFormattedTime';

interface WebRTCVideoProps {
  coreTimeId: number;
  memberId: number;
  nickname: string;
  mediaStream: MediaStream | undefined;
  isSelected: boolean;
  captureTime: number;
  setCapturedImageFile: Dispatch<SetStateAction<File | undefined>>;
  onClick: () => void;
}

const WebRTCVideo = ({
  coreTimeId,
  memberId,
  nickname,
  mediaStream,
  isSelected,
  captureTime,
  setCapturedImageFile,
  onClick,
}: WebRTCVideoProps) => {
  const curMemberId = useRecoilValue(memberIdState);
  const viewRef = useRef<HTMLVideoElement>(null);

  const captureAndSaveVideoFrame = () => {
    if (memberId !== curMemberId) return null;
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
    const now = new Date();
    const file = new File(
      [blob],
      `${coreTimeId} -${nickname}-${formatHHMMSS(now.toString())}.png`,
      {
        type: mimeString,
      },
    );

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
    <StVideoWrapper $isSelected={isSelected}>
      <StVideo ref={viewRef} onClick={onClick} autoPlay playsInline />
      <IcCoreChar />
      <StName>{nickname}</StName>
    </StVideoWrapper>
  );
};

export default WebRTCVideo;

const StVideoWrapper = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  grid-area: ${({ $isSelected }) => ($isSelected ? '1 / 1 / 2 / 3' : 'auto')};
  transition: grid-area 0.3s ease;

  & > button {
    width: 60%;
    padding: 0.5rem 0;

    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StVideo = styled.video`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;

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
