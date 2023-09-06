import { styled } from "styled-components";

import { IcCharacterSpeaker } from "@/public/assets/icons";

import { CancelButton, ConfirmButton } from "../Common/Button";
import { SmallModal } from "../Common/Modal";

interface CompleteModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const CompleteModal = ({ isShowing, handleCancel }: CompleteModalProps) => {
  const handleCopy = () => {
    console.log('공유하기');
  };

  return (
    <>
      {isShowing && (
        <SmallModal title="초대 링크 공유하기" isShowing={isShowing}>
          <StCompleteModalWrapper>
            <StContentWrapper>
              <IcCharacterSpeaker />
              <p>
                스터디룸이 생성되었어요.
                <br />
                링크를 공유하여 팀원을 초대하세요!
              </p>
            </StContentWrapper>
            <StLink>https://learniverse/sdjslekf/2343</StLink>
            <StBtnWrapper>
              <ConfirmButton btnName="만들기" onClick={handleCopy} />
              <CancelButton btnName="취소" onClick={handleCancel} />
            </StBtnWrapper>
          </StCompleteModalWrapper>
        </SmallModal>
      )}
    </>
  );
};

export default CompleteModal;

const StCompleteModalWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.6rem;
`;
const StContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StLink = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 3.2rem;
  margin-bottom: 1.6rem;

  border-radius: 0.4rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.Purple4};

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body1};
`;