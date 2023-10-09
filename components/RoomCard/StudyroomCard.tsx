import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { mutate } from "swr";

import { pinRoom } from "@/apis/roomList";
import { IcPlanet, IcStar, IcStarPinned } from "@/public/assets/icons";
import { memberIdState, roomIdState } from "@/recoil/atom";
import { StudyRoomInfo } from "@/types/studyroom";
import { getCategoryColor } from "@/utils/getCategoryColor";

interface StudyroomCardProps {
  roomData: StudyRoomInfo;
  roomType?: string;
  isPinned?: boolean;
  isMyroom?: boolean;
  handleApply?: () => void;
  handleManage?: () => void;
  handleEdit?: () => void;
}

const StudyroomCard = ({
  roomData,
  roomType,
  isPinned,
  isMyroom,
  handleApply,
  handleManage,
  handleEdit,
}: StudyroomCardProps) => {
  const {
    roomId,
    roomName,
    roomIntro,
    roomHashtags,
    roomCategory,
    roomCount,
    roomLimit,
    isMember,
  } = roomData;

  const router = useRouter();
  const memberId = useRecoilValue(memberIdState);
  const planetColor = getCategoryColor(roomCategory);

  const isMemberApproved = isMember === '승인' || isMember === '팀장';
  const canJoinRoom =
    isMemberApproved || (isMember === null && roomLimit > roomCount);

  const showManagementButtons = roomType === 'leader';
  const showStatus = roomType === 'apply';

  const setroomID = useSetRecoilState(roomIdState);
  const handlePin = async () => {
    await pinRoom(roomId, memberId);
    mutate(`/member/room/list?memberId=${memberId}`);
  };

  const handleGotoRoom = () => {
    setroomID(roomId);
    router.push(`/studyroom/${roomId}`);
  };

  return (
    <StCardWrapper>
      <StStudyroomCardWrapper>
        <StStarWrapper onClick={handlePin}>
          {isMyroom && (isPinned ? <IcStarPinned /> : <IcStar />)}
        </StStarWrapper>
        <StIconWrapper $planetColor={planetColor}>
          {roomId}
          <IcPlanet />
        </StIconWrapper>
        <StRoomName>{roomName}</StRoomName>
        <StHashtags>
          {roomHashtags.map((hashtag) => (
            <li key={hashtag}>#{hashtag}</li>
          ))}
        </StHashtags>
        <StCategory>{roomCategory}</StCategory>
        <StIntro>{roomIntro}</StIntro>
        <StJoinWrapper>
          <StLimit>
            정원
            <span> {roomCount}</span> / {roomLimit}명
          </StLimit>
          {isMember === null ? (
            <StJoin type="button" onClick={handleApply}>
              참여
            </StJoin>
          ) : (
            <StEnter
              type="button"
              disabled={!canJoinRoom}
              onClick={handleGotoRoom}
            >
              입장
            </StEnter>
          )}
        </StJoinWrapper>
      </StStudyroomCardWrapper>
      {showManagementButtons && (
        <StBtnWrapper>
          <button type="button" className="manage" onClick={handleManage}>
            신청자 관리
          </button>
          <button type="button" className="edit" onClick={handleEdit}>
            스터디 정보수정
          </button>
        </StBtnWrapper>
      )}
      {showStatus && (
        <StStatusWrapper $memberStatus={isMember}>
          신청 현황 <span>{isMember}</span>
        </StStatusWrapper>
      )}
    </StCardWrapper>
  );
};

export default StudyroomCard;

const StCardWrapper = styled.div`
  width: 14.1rem;
`;

const StStudyroomCardWrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 18.6rem;
  padding: 1.8rem 1.9rem;
  box-sizing: border-box;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};
`;

const StStarWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  cursor: pointer;
`;

const StIconWrapper = styled.div<{ $planetColor: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5.2rem;

  & > svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-top: 0.4rem;

    path {
      fill: ${({ $planetColor }) => $planetColor};
    }
  }
`;
const StRoomName = styled.p`
  ${({ theme }) => theme.fonts.Body2};
  text-align: center;
`;

const StHashtags = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  overflow: hidden;

  width: 100%;
  height: 2rem;
  max-width: 100%;
  margin: 0.6rem 0;

  & > li {
    display: inline-block;

    padding: 0.2rem 0.5rem;

    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Gray1};
    ${({ theme }) => theme.fonts.Body9};

    font-size: 0.6rem;
    font-style: normal;
    font-weight: 500;
  }
`;

const StCategory = styled.p`
  margin-bottom: 0.3rem;

  color: ${({ theme }) => theme.colors.Purple4};
  ${({ theme }) => theme.fonts.Body6};
`;

const StIntro = styled.p`
  margin-bottom: 0.5rem;

  width: 100%;
  height: 1.3rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};
`;

const StJoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StLimit = styled.p`
  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body6};

  & > span {
    color: ${({ theme }) => theme.colors.Orange1};
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StEnter = styled.button`
  padding: 0.2rem 0.7rem;

  border-radius: 0.4rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.Gray4 : theme.colors.Yellow2};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.White : theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StJoin = styled(StEnter)`
  background-color: ${({ theme }) => theme.colors.Purple4};
  color: ${({ theme }) => theme.colors.White};
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 0.6rem;

  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;

  & > button {
    padding: 0.3rem 0.45rem;

    border-radius: 0.5rem;
    ${({ theme }) => theme.fonts.Body6};
  }
  .manage {
    color: ${({ theme }) => theme.colors.LightGray2};
    background-color: ${({ theme }) => theme.colors.Purple3};
  }
  .edit {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.SkyBlue};
  }
`;

const StStatusWrapper = styled.div<{ $memberStatus: string }>`
  display: flex;
  justify-content: center;
  gap: 0.3rem;

  margin-top: 0.3rem;

  color: ${({ theme }) => theme.colors.LightGray1};
  ${({ theme }) => theme.fonts.Title5};

  & > span {
    margin-top: 0.3rem;
    margin-left: 2.4rem;
    padding: 0rem 0.3rem;

    border-radius: 0.4rem;
    ${({ theme }) => theme.fonts.Body4};
    background-color: ${({ $memberStatus }) => {
      switch ($memberStatus) {
        case '승인':
          return '#0ACF84';
        case '거절':
          return '#F14E1C';
        case '대기':
          return '#26C6DA';
        default:
          return 'transparent';
      }
    }};
  }
`;
