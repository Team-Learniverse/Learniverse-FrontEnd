import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { MoonDataInfo } from '@/types/member';

const useGetMoon = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<MoonDataInfo>>(
    `/member/moon/list?memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    moons: data?.data.moons,
    isLoading,
    isError: error,
  };
};

export default useGetMoon;
