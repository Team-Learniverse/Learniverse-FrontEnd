import { Dispatch, SetStateAction } from 'react';

import {
  ChattingInfo,
  ConsumerId,
  PeersInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { getNickName } from '../../utils/getNicknames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleConnectError = (error: any) => {
  console.error('socket connection error:', error.message);
};

export const handleNewProducers = async (
  data: PeersInfo[],
  consumeProducers: (producers: PeersInfo[]) => Promise<void>,
  setCurMembers: React.Dispatch<React.SetStateAction<RoomPeerInfo[]>>,
) => {
  console.log('4. New producers (consumeList)', data);

  await consumeProducers(data);

  const newMemberId = data[0].producer_user_id;
  const newMemberNickName = await getNickName(data[0].producer_user_name);

  setCurMembers((prev) => {
    if (prev.some((member) => member.id === newMemberId)) {
      return prev;
    }
    const newMember = {
      id: newMemberId,
      name: data[0].producer_user_name,
      nickname: newMemberNickName,
    };
    return [...prev, newMember];
  });
};

export const handleMessage = async (
  data: ChattingInfo,
  setChattingList: Dispatch<SetStateAction<ChattingInfo[]>>,
) => {
  const nickname = await getNickName(data.name.toString());
  const dataWithNickname = {
    name: nickname,
    message: data.message,
    time: data.time,
  };
  setChattingList((prev: ChattingInfo[]) => [...prev, dataWithNickname]);
};

export const handleConsumerClosed = (
  data: ConsumerId,
  removeStream: (consumer_id: string) => void,
) => {
  console.log('Closing Consumer : ', data);
  removeStream(data.consumer_id);
};
