import getToday from '@/utils/getToday';

import { client } from './axios';

export const getProfile = async (memberId: number) => {
  try {
    const { data } = await client.get(`/member/profile?memberId=${memberId}`);
    return data.data.member;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMoon = async (memberId: number) => {
  try {
    const { data } = await client.get(`/member/moon/list?memberId=${memberId}`);
    return data.data.moons;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMoon = async (memberId: number, curScore: number) => {
  try {
    if (curScore >= 4) return null;
    const data = await client.post(`/member/moon/add`, {
      memberId,
      moonDate: getToday(),
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.response?.data.message);
    return err.response?.data.message;
  }
};
