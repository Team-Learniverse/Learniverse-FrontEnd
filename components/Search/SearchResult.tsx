/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';

import { useGetSearchResult } from '@/hooks/StudyRooms';

import { StudyroomCard } from '../RoomCard';
import { StMyPageRoomListWrapper } from '../RoomList/MyPageStudyRoomList';

interface SearchResultProps {
  searched: boolean;
  searchType: string;
  keyword: string;
  memberId: number;
  handleApply: (roomId: number) => Promise<void>;
}

const SearchResult = ({
  searched,
  searchType,
  keyword,
  memberId,
  handleApply,
}: SearchResultProps) => {
  const [curPage, setCurPage] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { resultRoomList, mutate, isLoading } = useGetSearchResult(
    keyword,
    memberId,
    0,
    searchType,
  );

  useEffect(() => {
    setCurPage(0);
  }, [searchType]);

  // useEffect(() => {
  //   if (inView) {
  //     setCurPage((prev) => prev + 1);
  //     mutate(
  //       `/room/search?search=${keyword}&memberId=${memberId}&page=${curPage}`,
  //     );
  //   }
  // }, [inView]);

  console.log('curPage', curPage, inView);

  return (
    <StRoomListWrapper>
      {resultRoomList && resultRoomList.length > 0
        ? resultRoomList.map((room) => (
            <div key={room.roomId} ref={ref}>
              <StudyroomCard
                key={room.roomId}
                roomData={room}
                handleApply={
                  room.isMember === null
                    ? () => handleApply(room.roomId)
                    : undefined
                }
              />
            </div>
          ))
        : searched && !isLoading && <p>검색 결과가 없습니다.</p>}
    </StRoomListWrapper>
  );
};

export default SearchResult;

const StRoomListWrapper = styled(StMyPageRoomListWrapper)`
  position: relative;
  & > p {
    position: absolute;
    top: 10rem;
    left: -7rem;

    width: 23rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
