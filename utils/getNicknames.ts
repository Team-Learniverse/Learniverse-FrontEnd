import { getProfile } from '@/apis/profile';
import { ProfileInfo } from '@/types/member';
import { RoomPeerInfo } from '@/types/socket';

export const getNickName = async (memberId: string) => {
  const profile: ProfileInfo = await getProfile(Number(memberId));
  return profile.nickname;
};

export const addNickNameToPeer = async (
  peer: RoomPeerInfo,
): Promise<RoomPeerInfo> => {
  const nickname = await getNickName(peer.name);
  return {
    ...peer,
    nickname,
  };
};
