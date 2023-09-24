import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { CoreTimeInfo } from '@/types/studyroom';
import { changeDateFormat } from '@/utils/changeDateFormat';

import { StateBtn, StateDeleteBtn } from '../Common/Button';
import DeleteCoretimeModal from './Modal/DeleteCoretimeModal';

interface Props {
  coretime: CoreTimeInfo;
  isCoreId: number;
}

const CoreTimeCard = ({ coretime, isCoreId }: Props) => {
  const { coreTimeId, coreStartTime, coreEndTime } = coretime;
  const deleteCT = useModal();

  const handleDeleteOpen = () => {
    console.log('삭제');
    deleteCT.toggle();
  };

  return (
    <>
      <StCoretimeWrapper>
        <StContent>
          <p>
            {changeDateFormat(coreStartTime.toString())} -{' '}
            {changeDateFormat(coreEndTime.toString())}
          </p>
          {isCoreId === coreTimeId ? (
            <StateBtn btnName="진행중" />
          ) : (
            <StateDeleteBtn btnName="삭제" handleClick={handleDeleteOpen} />
          )}
        </StContent>
      </StCoretimeWrapper>
      <StDeleteModalWrapper $showing={deleteCT.isShowing}>
        <DeleteCoretimeModal
          isShowing={deleteCT.isShowing}
          coretimeInfo={coretime}
          handleCancel={deleteCT.toggle}
        />
      </StDeleteModalWrapper>
    </>
  );
};

export default CoreTimeCard;

const StCoretimeWrapper = styled.div``;
const StContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 0.6rem;
  margin-bottom: 0.6rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StDeleteModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5); */
`;