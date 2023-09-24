import { styled } from 'styled-components';

import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import {
  IcCaptureModal,
  IcCaptureTimer,
  IcCaptureWarning,
} from '@/public/assets/icons';

interface ExitCoretimeModallProps {
  isShowing: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const CaptureModal = ({
  isShowing,
  handleSubmit,
  handleCancel,
}: ExitCoretimeModallProps) => {
  return (
    isShowing && (
      <StCaptureModalWrapper>
        <IcCaptureModal />
        <h1>CAPTURE</h1>
        <StContentWrapper>
          <p>
            <IcCaptureWarning /> 실시간 랜덤 캡쳐된 화면입니다.
          </p>
          <p>열심히 공부한 화면을 다른사람과 공유해보세요!</p>
        </StContentWrapper>
        <StImage />
        <StBtnWrapper>
          <ConfirmButton btnName="전송" onClick={handleSubmit} />
          <CancelButton btnName="취소" onClick={handleCancel} />
        </StBtnWrapper>
        <StTime>
          <p>
            <IcCaptureTimer /> 전송까지 남은 시간 : 21초
          </p>
        </StTime>
      </StCaptureModalWrapper>
    )
  );
};

export default CaptureModal;

const StCaptureModalWrapper = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 74.4rem;
  height: 49.5rem;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
  }
  & > h1 {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Head0};
  }
`;

const StImage = styled.div`
  width: 37.2rem;
  height: 21.4rem;

  background-color: ${({ theme }) => theme.colors.Black};
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.6rem 0 2.1rem 0;

  & > p {
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body0};

    & > svg {
      padding-top: 0.7rem;
    }
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;

  padding-top: 1.6rem;
`;

const StTime = styled.div`
  padding-top: 0.8rem;

  & > p {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body4};
  }
`;
