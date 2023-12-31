export interface MemberListInfo {
  members: MemberInfo[];
}

export interface MemberInfo {
  memberId: number;
  memberEmail: string;
  githubId: string;
  nickname: string;
  message?: string; // 지워야함
  memberMessage: string;
  status: boolean;
  isMember: string;
}

export interface ProfileDataInfo {
  member: ProfileInfo;
}

export interface ProfileInfo {
  imageUrl: string;
  nickname: string;
  memberMessage?: string;
}

export interface MoonDataInfo {
  moons: MoonInfo[];
}

export interface MoonInfo {
  moonDate: Date;
  moonScore: number;
}

export interface MemberTokenInfo {
  tokenId?: string;
  memberId: number;
  token: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface PostProfileInfo {
  memberId: number;
  nickname: string;
  memberMessage: string;
}
