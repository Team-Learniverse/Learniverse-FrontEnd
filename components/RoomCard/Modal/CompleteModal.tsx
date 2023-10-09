import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { CancelButton, ConfirmButton } from "@/components/Common/Button";
import { SmallModal } from "@/components/Common/Modal";
import { IcCharacterSpeaker } from "@/public/assets/icons";
import { encodedUrlState } from "@/recoil/atom";

interface CompleteModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const CompleteModal = ({ isShowing, handleCancel }: CompleteModalProps) => {
  const encodedUrl = useRecoilValue(encodedUrlState);
  const linkToCopy = `learniverse-front-end.vercel.app/apply/${encodedUrl}`;
  const linkToRoute = `learniverse-front-end.vercel.app/apply/${encodedUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToRoute).then(() => {
      alert('링크를 클립보드에 복사했습니다.');
    });
  };

  return (
    isShowing && (
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
          <StLink>{linkToCopy}</StLink>
          <StBtnWrapper>
            <ConfirmButton btnName="공유하기" onClick={handleCopy} />
            <CancelButton btnName="취소" onClick={handleCancel} />
          </StBtnWrapper>
        </StCompleteModalWrapper>
      </SmallModal>
    )
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
  ${({ theme }) => theme.fonts.Body5};
`;
