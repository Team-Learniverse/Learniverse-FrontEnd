import { styled } from 'styled-components';

import { deleteIssue } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import { IcCharacterX } from '@/public/assets/icons';

interface Props {
  isShowing: boolean;
  issueId: number;
  handleCancel: () => void;
}

const CloseIssueModal = ({ isShowing, issueId, handleCancel }: Props) => {
  const handleCloseIssue = async () => {
    await deleteIssue(issueId);
    handleCancel();
  };

  return (
    isShowing && (
      <SmallModal title="깃허브 이슈 CLOSE 하기" isShowing={isShowing}>
        <StDeleteModalWrapper>
          <StCommentWrapper>
            <IcCharacterX />
            <p>깃허브에서 이슈를 CLOSE 하시겠어요?</p>
          </StCommentWrapper>
          <StBtnWrapper>
            <ConfirmButton btnName="CLOSE" onClick={handleCloseIssue} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StDeleteModalWrapper>
      </SmallModal>
    )
  );
};

export default CloseIssueModal;

const StDeleteModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.5rem 2rem;
`;

const StCommentWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin: 1rem;

  & > p {
    margin-top: 5rem;
    margin-left: 2rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body2};
  }
`;
const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
