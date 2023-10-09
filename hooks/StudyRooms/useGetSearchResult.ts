/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomListInfo } from '@/types/studyroom';

const useGetSearchResult = (
  keyword: string,
  memberId: number,
  page: number,
  searchType: string,
) => {
  const endpoint =
    searchType === 'hashtag'
      ? `/room/search/hashtag?hashtag=${keyword}&memberId=${memberId}&page=${page}`
      : `/room/search?search=${keyword}&memberId=${memberId}&page=${page}`;

  const { data, error, mutate, isLoading } = useSWR<
    AxiosResponse<StudyRoomListInfo>
  >(
    !keyword ? null : endpoint, // keyword가 없으면 useSWR에 null을 전달하여 요청을 스킵
    mainGetFetcher,
  );

  const fetchMore = async (curPage: number) => {
    const newEndpoint =
      searchType === 'hashtag'
        ? `/room/search/hashtag?hashtag=${keyword}&memberId=${memberId}&page=${curPage}`
        : `/room/search?search=${keyword}&memberId=${memberId}&page=${curPage}`;

    const newData: AxiosResponse<StudyRoomListInfo> = await mainGetFetcher(
      newEndpoint,
    );

    // mutate(
    //   (prevData) => ({
    //     ...newData,
    //     rooms: [...prevData, ...newData?.data.rooms],
    //   }),
    //   false,
    // );
  };

  return {
    resultRoomList: data?.data.rooms,
    mutate,
    fetchMore,
    isLoading,
    isError: error,
  };
};

export default useGetSearchResult;
