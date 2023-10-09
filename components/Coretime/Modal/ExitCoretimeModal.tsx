import { styled } from 'styled-components';

import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import { IcCharacterDot } from '@/public/assets/icons';

interface ExitCoretimeModallProps {
  isShowing: boolean;
  handleExit: () => void;
  handleCancel: () => void;
}

const ExitCoretimeModal = ({
  isShowing,
  handleExit,
  handleCancel,
}: ExitCoretimeModallProps) => {
  return (
    isShowing && (
      <SmallModal title="코어타임 나가기" isShowing={isShowing}>
        <StCompleteModalWrapper>
          <StContentWrapper>
            <IcCharacterDot />
            <p>코어타임에서 나가시나요?</p>
          </StContentWrapper>
          <StBtnWrapper>
            <ConfirmButton btnName="나가기" onClick={handleExit} />
            <CancelButton btnName="취소" onClick={handleCancel} />
          </StBtnWrapper>
        </StCompleteModalWrapper>
      </SmallModal>
    )
  );
};

export default ExitCoretimeModal;

const StCompleteModalWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem;
`;

const StContentWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 90%;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > svg {
    width: 12rem;
    height: 12rem;
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
