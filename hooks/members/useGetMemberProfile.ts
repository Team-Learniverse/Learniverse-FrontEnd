import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { ProfileDataInfo } from '@/types/member';

const useGetMemberProfile = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<ProfileDataInfo>>(
    `/member/profile?memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    imgUrl: data?.data?.member.imageUrl,
    nickname: data?.data?.member.nickname,
    isLoading,
    isError: error,
  };
};

export default useGetMemberProfile;
