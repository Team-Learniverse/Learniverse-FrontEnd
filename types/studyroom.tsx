// 이런식으로 페이지 또는 컴포넌트별 필요한 타입 혹은 인터페이스 선언 파일 만들어서 모아주세요!

export interface LearniverseResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface StudyRoomListInfo {
  rooms: StudyRoomInfo[];
}

export interface StudyRoomInfo {
  roomId: number;
  roomName: string;
  roomIntro: string;
  hashtags: string[];
  roomCategory: string;
  roomCount: number;
  roomLimit: number;
  isMember: string;
}

export interface PostStudyRoomInfo {
  member_id: number;
  roomName: string;
  roomCategory: number;
  roomIntro?: string;
  roomLimit: number;
  roomHashtags: string[];
  room_git_org?: string;
  room_notion?: string;
  room_google_drive?: string;
  room_figma?: string;
}

// {
// "member_id" : 1,
// "roomCategory" : 4,
// "roomHashtags": ["졸프"],
// "roomIntro" : "소웨공주들 졸프",
// "roomLimit" : 5,
// "roomName" : "러니버스"
// }
