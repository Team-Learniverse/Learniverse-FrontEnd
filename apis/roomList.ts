import { EditStudyRoomInfo, PostStudyRoomInfo } from "@/types/studyroom";

import { ai, client } from "./axios";

export const createRoom = async (postRoomData: PostStudyRoomInfo) => {
  try {
    const { data } = await client.post('/room/create', postRoomData);
    return data.data.encoded;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getEditRoomInfo = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/modify/info?roomId=${roomId}`);
    return data.data.info;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postEditRoom = async (editRoomData: EditStudyRoomInfo) => {
  try {
    const { data } = await client.post('/room/update', editRoomData);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const pinRoom = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post('/member/pin', {
      roomId,
      memberId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(`/room/list?memberId=${memberId}`);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(`/member/room/list?memberId=${memberId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLeaderRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(
      `/member/room/list/leader?memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApplyRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(
      `/member/room/list/apply?memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchHashtag = async (hashtag: string, memberId: number) => {
  try {
    const { data } = await client.get(
      `/room/search/hashtag?hashtag=${hashtag}&memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const recommendRoomList = async (memberId: number) => {
  try {
    const { data } = await ai.get(`/recommendRoom?memberId=${memberId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
