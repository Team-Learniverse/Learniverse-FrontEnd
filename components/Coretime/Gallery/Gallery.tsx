import { styled } from 'styled-components';

import { LargeModal } from '@/components/Common/Modal';

interface GalleryModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const Gallery = ({ isShowing, handleCancel }: GalleryModalProps) => {
  return (
    isShowing && (
      <LargeModal title="랜덤 캡처 화면 갤러리" isShowing={isShowing}>
        <StGrlleryWrapper>
          갤러리
          <button type="button" onClick={handleCancel}>
            X
          </button>
        </StGrlleryWrapper>
      </LargeModal>
    )
  );
};

export default Gallery;

const StGrlleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5rem 3.4rem 2.4rem 3.4rem;
  box-sizing: border-box;
`;
