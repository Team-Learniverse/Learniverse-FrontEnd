export interface MemberListInfo {
  members: MemberInfo[];
}

export interface MemberInfo {
  memberId: number;
  memberEmail: string;
  nickname: string;
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
}

export interface MoonDataInfo {
  moons: MoonInfo[];
}

export interface MoonInfo {
  moonDate: Date;
  moonScore: number;
}

export interface MoonScoreInfo {
  isFirstAccess: number;
  isCoreTimeParticipate: number;
  isCapture: number;
}

export interface MemberTokenInfo {
  tokenId?: string;
  memberId: number;
  token: string;
  createdDate?: Date;
  updatedDate?: Date;
}
