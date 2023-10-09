import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomDataInfo } from '@/types/studyroom';

const useGetRoomInfo = (roomId: number, memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomDataInfo>>(
    `/room/info?roomId=${roomId}&memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    roomInfo: data?.data.rooms,
    isLoading,
    isError: error,
  };
};

export default useGetRoomInfo;
