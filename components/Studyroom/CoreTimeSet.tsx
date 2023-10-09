/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getCoretimeID } from '@/apis/coretimes';
import { getCoretimeList } from '@/apis/studyroom';
import useModal from '@/hooks/useModal';
import { IcPlusBtn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
import { CoreTimeInfo } from '@/types/studyroom';

import CoreTimeCard from './CoretimeCard';
import CreateCoretimeModal from './Modal/CreateCoretimeModal';

const CoreTimeSet = () => {
  const router = useRouter();
  const coreRef = useRef<HTMLDivElement>(null);
  const room_id = useRecoilValue(roomIdState);

  const create = useModal();

  const [coreTimeList, setCoreTimeList] = useState<CoreTimeInfo[]>();
  const [isCoreTime, setIsCoreTime] = useState<boolean>();
  const [nowCoreId, setNowCoreId] = useState<number>();

  const getCoretimes = async () => {
    const coresInfo = await getCoretimeList(room_id);
    const { cores, isCore } = coresInfo;

    if (isCore) {
      // 현재 코어타임 여부 확인
      const coreID: number = await getCoretimeID(room_id);
      console.log(coreID);
      setNowCoreId(coreID);
    }

    setCoreTimeList(cores);
    setIsCoreTime(isCore);
  };

  const handleOpen = () => {
    create.toggle();
  };

  const handleAttend = () => {
    router.push({
      pathname: `/coretime/${room_id}`,
      query: { room_id: nowCoreId },
    });
  };

  useEffect(() => {
    getCoretimes();
  }, []);

  // useEffect(() => {
  //   if (coreRef.current) {
  //     coreRef.current.scrollTop = coreRef.current.scrollHeight;
  //   }
  // }, [coreTimeList]);

  return (
    <>
      <StCoretimeWrapper>
        <StTitleWrapper>
          <h1>코어타임</h1>
          <IcPlusBtn type="button" onClick={handleOpen} />
        </StTitleWrapper>
        <StCoretableWrapper ref={coreRef}>
          {coreTimeList &&
            coreTimeList.map((core) => (
              <CoreTimeCard
                key={core.coreTimeId}
                coretime={core}
                isCoreId={nowCoreId!}
              />
            ))}
        </StCoretableWrapper>
        <StCoreBtn type="button" disabled={!isCoreTime} onClick={handleAttend}>
          <p>코어타임 입장하기</p>
        </StCoreBtn>
      </StCoretimeWrapper>
      <StCreateModalWrapper $showing={create.isShowing}>
        <CreateCoretimeModal
          isShowing={create.isShowing}
          handleCancel={create.toggle}
        />
      </StCreateModalWrapper>
    </>
  );
};

export default CoreTimeSet;

const StCoretimeWrapper = styled.div`
  margin: 2rem 3rem;

  display: flex;
  flex-direction: column;
`;

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }

  cursor: pointer;
`;
const StCoretableWrapper = styled.div`
  width: 100%;
  height: 16rem;
  margin: 2rem 0 0 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StCoreBtn = styled.button`
  width: 100%;
  height: 5.6rem;
  margin-top: 3rem;

  position: relative;
  bottom: 1rem;

  border-radius: 2.5rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title2};
  }

  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.Gray3 : theme.colors.Purple3};
  box-shadow:
    2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const StCreateModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
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
