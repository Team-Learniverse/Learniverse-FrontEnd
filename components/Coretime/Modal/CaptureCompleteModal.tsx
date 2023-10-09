import { styled } from 'styled-components';

import { ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { IcCharacterCheck } from '@/public/assets/icons';

interface ExitCoretimeModallProps {
  isShowing: boolean;
  handleConfirm: () => void;
}

const CaptureCompleteModal = ({
  isShowing,
  handleConfirm,
}: ExitCoretimeModallProps) => {
  return (
    isShowing && (
      <LargeModal title="랜덤 캡처 사진 전송 완료" isShowing={isShowing}>
        <StCompleteModalWrapper>
          <StContentWrapper>
            <IcCharacterCheck />
            <p>
              실시간 랜덤 캡처 화면이 전송되었어요.
              <br />
              갤러리에서 다른 팀원들의 화면을 확인해보세요!
            </p>
          </StContentWrapper>
          <StBtnWrapper>
            <ConfirmButton btnName="확인" onClick={handleConfirm} />
          </StBtnWrapper>
        </StCompleteModalWrapper>
      </LargeModal>
    )
  );
};

export default CaptureCompleteModal;

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
    padding-top: 2.5rem;

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
