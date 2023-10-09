import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getNoticeList } from '@/apis/studyroom';
import useModal from '@/hooks/useModal';
import { IcPlusBtn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
import { NoticeInfo } from '@/types/studyroom';

import CreateNoticeModal from './Modal/CreateNoticeModal';
import NoticeCard from './NoticeCard';

const Notice = () => {
  const roomID = useRecoilValue(roomIdState);

  const create = useModal();
  const [noticeList, setNoticeList] = useState<NoticeInfo[]>();

  const getNotices = async () => {
    console.log(roomID);
    const noticeInfo = await getNoticeList(roomID);
    console.log(noticeInfo);

    setNoticeList(noticeInfo);
  };

  const handleOpen = () => {
    create.toggle();
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <>
      <StNoticeWrapper>
        <StTitleWrapper>
          <h1>스터디룸 공지</h1>
          <IcPlusBtn type="button" onClick={handleOpen} />
        </StTitleWrapper>
        <StComent>
          {noticeList &&
            noticeList.map((notice) => (
              <NoticeCard key={notice.boardId} noticeInfo={notice} />
            ))}
        </StComent>
      </StNoticeWrapper>
      <StCreateModalWrapper $showing={create.isShowing}>
        <CreateNoticeModal
          isShowing={create.isShowing}
          handleCancel={create.toggle}
        />
      </StCreateModalWrapper>
    </>
  );
};

export default Notice;

const StNoticeWrapper = styled.div`
  margin: 2rem;
  position: relative;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StComent = styled.div`
  height: 23.6rem;
  margin: 2.4rem 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
