import React from 'react';
import { styled } from 'styled-components';

import { ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import { StManageModalWrapper } from '@/components/RoomList/MyPageStudyRoomList';
import {
  StContentWrapper,
  StSmallModalWrapper,
} from '@/containers/Apply/ApplyContainer';
import { IcCharacterCheck } from '@/public/assets/icons';

interface StudyApplyCompleteModalProps {
  isShowing: boolean;
  toggleModal: () => void;
}

const ApplyCompleteModal: React.FC<StudyApplyCompleteModalProps> = ({
  isShowing,
  toggleModal,
}) => {
  return (
    <StCompleteModalWrapper $showing={isShowing}>
      <SmallModal title="스터디 참여 신청 완료" isShowing={isShowing}>
        <StModalWrapper>
          <StModalContentWrapper>
            <IcCharacterCheck />
            <p>
              스터디 참여 신청이 완료되었어요.
              <br />
              팀장이 수락한 뒤 스터디에 참여할 수 있어요.
            </p>
          </StModalContentWrapper>
          <ConfirmButton btnName="확인" onClick={toggleModal} />
        </StModalWrapper>
      </SmallModal>
    </StCompleteModalWrapper>
  );
};

export default ApplyCompleteModal;

const StCompleteModalWrapper = styled(StManageModalWrapper)`
  z-index: 20;
`;

const StModalWrapper = styled(StSmallModalWrapper)``;

const StModalContentWrapper = styled(StContentWrapper)``;
