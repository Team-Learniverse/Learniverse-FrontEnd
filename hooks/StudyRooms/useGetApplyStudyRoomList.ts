import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomListInfo } from '@/types/studyroom';

const useGetApplyStudyRoomList = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomListInfo>>(
    `/member/room/list/apply?memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    applyStudyRoomList: data?.data.rooms,
    isLoading,
    isError: error,
  };
};

export default useGetApplyStudyRoomList;
