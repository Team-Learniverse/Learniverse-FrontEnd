import { styled } from 'styled-components';

import { DeleteCoretime } from '@/apis/coretimes';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import { IcCharacterX } from '@/public/assets/icons';
import { CoreTimeInfo } from '@/types/studyroom';
import { changeDateFormat } from '@/utils/changeDateFormat';

interface Props {
  isShowing: boolean;
  coretimeInfo: CoreTimeInfo;
  handleCancel: () => void;
}

const DeleteCoretimeModal = ({
  isShowing,
  coretimeInfo,
  handleCancel,
}: Props) => {
  const { coreStartTime, coreEndTime, coreTimeId } = coretimeInfo;

  const handleDeleteCoretime = async () => {
    console.log(coreTimeId);
    await DeleteCoretime(coreTimeId);
    handleCancel();
  };

  return (
    isShowing && (
      <SmallModal title="코어타임 삭제하기" isShowing={isShowing}>
        <StDeleteModalWrapper>
          <StCommentWrapper>
            <IcCharacterX />
            <p>
              {changeDateFormat(coreStartTime.toString())} -
              {changeDateFormat(coreEndTime.toString())}
              <p>해당 코어타임을 삭제하시겠습니까?</p>
            </p>
          </StCommentWrapper>
          <StBtnWrapper>
            <ConfirmButton btnName="삭제하기" onClick={handleDeleteCoretime} />
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

export default DeleteCoretimeModal;

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
  & > p > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body2};
  }
`;
const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
