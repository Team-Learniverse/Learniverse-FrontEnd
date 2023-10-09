import { client } from "./axios";

export const getWaitMembers = async (roomId: number) => {
  try {
    const { data } = await client.get(
      `/room/member/list/isWait?roomId=${roomId}`,
    );
    return data.data.members;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const JoinMember = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post(`/room/member/join`, {
      roomId,
      memberId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const RejectMember = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post(`/room/member/reject`, {
      roomId,
      memberId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomMembers = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/member/list?roomId=${roomId}`);
    console.log(data.data.members);
    return data.data.members;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
