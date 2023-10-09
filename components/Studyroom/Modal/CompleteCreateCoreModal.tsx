import { styled } from 'styled-components';

import { ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import { IcCharacterSpeaker } from '@/public/assets/icons';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const CompleteCreateCoreModal = ({ isShowing, handleCancel }: Props) => {
  return (
    isShowing && (
      <SmallModal title="코어타임 생성 완료" isShowing={isShowing}>
        <StCompleteModalWrapper>
          <StContentWrapper>
            <IcCharacterSpeaker />
            <p>
              코어타임이 생성되었어요.
              <br />
              코어타임 목록에서 확인해보세요!
            </p>
          </StContentWrapper>
          <StBtnWrapper>
            <ConfirmButton btnName="확인" onClick={handleCancel} />
          </StBtnWrapper>
        </StCompleteModalWrapper>
      </SmallModal>
    )
  );
};

export default CompleteCreateCoreModal;

const StCompleteModalWrapper = styled.div``;

const StContentWrapper = styled.div``;
const StBtnWrapper = styled.div``;
