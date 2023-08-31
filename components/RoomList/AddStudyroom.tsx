import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { IcAddStudyRoom } from '@/public/assets/icons';

import AddStudyroomModal from './AddStudyroomModal';

const AddStudyroom = () => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <StAddStudyroomWrapper onClick={toggle}>
        <IcAddStudyRoom />
        스터디룸 생성
      </StAddStudyroomWrapper>
      <StAddModalWrapper isShowing={isShowing}>
        <AddStudyroomModal isShowing={isShowing} handleCancel={toggle} />
      </StAddModalWrapper>
    </>
  );
};

export default AddStudyroom;

const StAddStudyroomWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  width: 14.1rem;
  height: 18.6rem;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};
`;

const StAddModalWrapper = styled.div<{ isShowing: boolean }>`
  display: ${({ isShowing }) => (isShowing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;