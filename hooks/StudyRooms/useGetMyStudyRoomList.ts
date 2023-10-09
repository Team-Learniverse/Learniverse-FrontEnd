import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomListInfo } from '@/types/studyroom';

const useGetMyStudyRoomList = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomListInfo>>(
    `/member/room/list?memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    myStudyRoomList: data?.data,
    isLoading,
    isError: error,
  };
};

export default useGetMyStudyRoomList;
