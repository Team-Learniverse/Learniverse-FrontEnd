import {
  PostDiscussInfo,
  PostIssueInfo,
  PostNoticeInfo,
  PostWorkSpaceInfo
} from "@/types/studyroom";

import { client } from "./axios";

export const decodeRoomId = async (encodedUrl: string) => {
  try {
    const { data } = await client.get(`/room/decode?encoded=${encodedUrl}`);
    return data.data.roomId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomInfo = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.get(
      `/room/info?roomId=${roomId}&memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLanguages = async () => {
  try {
    const { data } = await client.get('/room/languages');
    return data.data.languages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const applyRoom = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post(`/room/member/apply`, {
      roomId,
      memberId,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCoretimeList = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/core/list?roomId=${roomId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postWorkspace = async (PostWorkSpaceData: PostWorkSpaceInfo) => {
  try {
    const { data } = await client.post(
      `/room/workspace/update`,
      PostWorkSpaceData,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getStudyroomWorkSpace = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/info/workspace?roomId=${roomId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getStudyroomName = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/info/roomName?roomId=${roomId}`);
    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postNotice = async (PostNoticeData: PostNoticeInfo) => {
  try {
    const { data } = await client.post(`/room/board/create`, PostNoticeData);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getNoticeList = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/boards?roomId=${roomId}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DeleteNotice = async (boardId: number) => {
  try {
    const { data } = await client.delete(
      `/room/board/delete?boardId=${boardId}`,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const CreateIssue = async (PostIssueData: PostIssueInfo) => {
  try {
    const { data } = await client.post(`/room/issue/create`, PostIssueData);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueList = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/issues?roomId=${roomId}`);
    return data.data.issues;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueInfo = async (issueId: number) => {
  try {
    const { data } = await client.get(`/room/issue?issueId=${issueId}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getDiscussions = async (issueId: number) => {
  try {
    const { data } = await client.get(`room/discussions?issueId=${issueId}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postDiscuss = async (PostDiscussData: PostDiscussInfo) => {
  try {
    const { data } = await client.post(
      `room/discussion/create`,
      PostDiscussData,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteIssue = async (issueId: number) => {
  try {
    const { data } = await client.post(`room/issue/update`, {
      issueId,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
