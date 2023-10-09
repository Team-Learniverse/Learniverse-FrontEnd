import { AxiosResponse } from "axios";
import useSWR from "swr";

import { aiGetFetcher } from "@/apis/axios";

const useGetRecommendRoomList = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<number[]>>(
    `/recommendRoom?memberId=${memberId}`,
    aiGetFetcher,
  );

  return {
    recommendRoomIdList: data?.data,
    isLoading,
    isError: error,
  };
};

export default useGetRecommendRoomList;
