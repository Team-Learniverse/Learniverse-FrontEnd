import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getCapture } from '@/apis/coretimes';
import { LargeModal } from '@/components/Common/Modal';
import { ImageListInfo } from '@/types/capture';
import { formatHHMMSS } from '@/utils/getFormattedTime';
import { getNickName } from '@/utils/getNicknames';

import { memberIdState } from '../../../recoil/atom';

interface GalleryModalProps {
  curRoomId: string;
  isShowing: boolean;
  handleCancel: () => void;
}

const GalleryModal = ({
  curRoomId,
  isShowing,
  handleCancel,
}: GalleryModalProps) => {
  const [galleryImages, setGalleryImages] = useState<ImageListInfo[] | null>(
    null,
  );
  const curMemberId = useRecoilValue(memberIdState);

  const removeDuplicateFile = (images: ImageListInfo[]): ImageListInfo[] => {
    const uniqueLinks = new Set<string>();
    return images.filter((image) => {
      if (uniqueLinks.has(image.fileLink)) {
        return false;
      }
      uniqueLinks.add(image.fileLink);
      return true;
    });
  };

  const getGalleryData = async () => {
    const images = await getCapture(curRoomId);
    const filteredImages = removeDuplicateFile(images);

    const updatedImages = await Promise.all(
      filteredImages.map(async (image) => {
        const nickname = await getNickName(image.memberId.toString());
        return { ...image, nickname };
      }),
    );

    setGalleryImages(updatedImages);
  };

  useEffect(() => {
    if (isShowing) getGalleryData();
  }, [isShowing]);

  return (
    isShowing && (
      <LargeModal title="랜덤 캡처 화면 갤러리" isShowing={isShowing}>
        <StCloseBtn type="button" onClick={handleCancel}>
          𝗫
        </StCloseBtn>
        <StGrlleryWrapper>
          {galleryImages && (
            <>
              {galleryImages.map((image) => (
                <StImageWrapper
                  key={`${image.memberId}-${image.createdTime}`}
                  $iscurrentuser={image.memberId === Number(curMemberId)}
                >
                  <p>
                    {image.nickname}
                    <span>{formatHHMMSS(image.createdTime)}</span>
                  </p>
                  {/* <img src={image.fileLink} alt="capture" /> */}
                  <Image
                    src={image.fileLink}
                    alt="capture"
                    width={438}
                    height={274}
                  />
                </StImageWrapper>
              ))}
            </>
          )}
        </StGrlleryWrapper>
      </LargeModal>
    )
  );
};

export default GalleryModal;

const StCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;

  ${({ theme }) => theme.fonts.Title1};
`;

const StGrlleryWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  max-height: 56rem;
  padding: 1.5rem 3.4rem 2.4rem 3.4rem;
  box-sizing: border-box;
`;

const StImageWrapper = styled.div<{ $iscurrentuser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 85%;
  padding-bottom: 2.2rem;

  & > p {
    width: 100%;
    padding-bottom: 0.6rem;

    color: ${({ theme }) => theme.colors.Gray1};
    ${({ theme }) => theme.fonts.Title4};
    text-align: ${({ $iscurrentuser }) => ($iscurrentuser ? 'right' : 'left')};

    & > span {
      padding-left: 1rem;

      color: ${({ theme }) => theme.colors.Purple4};
      ${({ theme }) => theme.fonts.Body6};
    }
  }
  & > img {
    width: 100%;

    border-radius: 0.8rem;
  }
`;
