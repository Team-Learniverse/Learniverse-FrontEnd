// 이런식으로 페이지 또는 컴포넌트별 필요한 타입 혹은 인터페이스 선언 파일 만들어서 모아주세요!

export interface LearniverseResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface StudyRoomListInfo {
  pinRooms?: StudyRoomInfo[];
  rooms: StudyRoomInfo[];
}

export interface StudyRoomDataInfo {
  rooms: StudyRoomInfo;
}

export interface StudyRoomInfo {
  roomId: number;
  roomName: string;
  roomIntro: string;
  roomHashtags: string[];
  roomCategory: string;
  roomCount: number;
  roomLimit: number;
  isMember: string;
}

export interface EditStudyRoomInfo {
  roomId: number;
  roomName: string;
  roomCategory: number;
  roomIntro: string;
  roomLimit: number;
  roomHashtags: string[];
}

export interface PostStudyRoomInfo {
  memberId: number;
  roomName: string;
  roomCategory: number;
  roomLanguages?: string[];
  roomIntro?: string;
  roomLimit: number;
  roomHashtags: string[];
  room_git_org?: string;
  room_notion?: string;
  room_google_drive?: string;
  room_figma?: string;
}

export interface CoreTimeListInfo {
  cores: CoreTimeInfo[];
}

export interface CoreTimeInfo {
  coreTimeId: number;
  roomId: number;
  coreStartTime: Date;
  coreEndTime: Date;
  captureNum: number;
  isCore: boolean;
}

export interface CoreTimeIdInfo {
  coreTimeId: number;
}

export interface PostCoreTimeInfo {
  roomId: number;
  coreStartTime: Date;
  coreHour: number;
  coreMinute: number;
  captureNum: number;
}

export interface WorkSpaceInfo {
  roomGitOrg: string;
  roomNotion: string;
  roomGoogleDrive: string;
  roomFigma: string;
}

export interface PostWorkSpaceInfo {
  roomId: number;
  roomGitOrg?: string;
  roomNotion?: string;
  roomGoogleDrive?: string;
  roomFigma?: string;
}

export interface PostNoticeInfo {
  memberId: number;
  roomId: number;
  title: string;
  content: string;
}

export interface NoticeListInfo {
  notices: NoticeInfo[];
}

export interface NoticeInfo {
  memberId: number;
  boardId: number;
  title: string;
  content: string;
}

export interface IssueListInfo {
  issues: IssueInfo[];
}

export interface IssueInfo {
  issueId: number;
  memberId: number;
  roomId: number;
  issueTitle: string;
  issueDescription: string;
  issueGitUrl: string;
  gitFileName: string;
  gitCode: string;
  issueOpen: boolean;
  createdDate: Date;
}

export interface PostIssueInfo {
  roomId: number;
  memberId: number;
  issueTitle: string;
  issueDescription: string;
  issueGitUrl: string;
  gitFileName: string;
}

export interface DiscussInfo {
  opinionId: number;
  issueId: number;
  memberId: number;
  issueOpinion: string;
  issueOpinionLine: number;
  createdDate: Date;
}

export interface PostDiscussInfo {
  issueId: number;
  memberId: number;
  issueOpinion: string;
  issueOpinionLine: number;
}
