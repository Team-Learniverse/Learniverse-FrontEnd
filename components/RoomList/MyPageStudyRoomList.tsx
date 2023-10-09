import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import {
  useGetApplyStudyRoomList,
  useGetLeaderStudyRoomList
} from "@/hooks/StudyRooms";
import useModal from "@/hooks/useModal";
import { IcCharacterCheck } from "@/public/assets/icons";
import { memberIdState } from "@/recoil/atom";
import { StudyRoomInfo } from "@/types/studyroom";

import { ConfirmButton } from "../Common/Button";
import SmallModal from "../Common/Modal/SmallModal";
import { ManageModal } from "../RoomCard/Modal";
import EditModal from "../RoomCard/Modal/EditModal";
import StudyroomCard from "../RoomCard/StudyroomCard";

interface MyPageStudyRoomListProps {
  isLeader?: boolean;
}

// TODO : 리팩토링 - 컴포넌트 분리
const MyPageStudyRoomList = ({ isLeader }: MyPageStudyRoomListProps) => {
  const [roomList, setRoomList] = useState<StudyRoomInfo[]>();

  const [roomId, setRoomId] = useState<number>(0);
  const memberId = useRecoilValue(memberIdState);

  const { leaderStudyRoomList } = useGetLeaderStudyRoomList(memberId);
  const { applyStudyRoomList } = useGetApplyStudyRoomList(memberId);

  const manage = useModal();
  const edit = useModal();
  const editConfirm = useModal();

  const getRoomList = () => {
    let rooms: StudyRoomInfo[] = [];
    if (isLeader) {
      rooms = leaderStudyRoomList || [];
    } else {
      rooms = applyStudyRoomList || [];
    }
    setRoomList(rooms);
  };

  const handleManage = async (curRoomId: number) => {
    setRoomId(curRoomId);
    manage.toggle();
  };

  const handleEdit = async (curRoomId: number) => {
    setRoomId(curRoomId);
    edit.toggle();
  };

  useEffect(() => {
    getRoomList();
  }, [isLeader, leaderStudyRoomList, applyStudyRoomList]);

  return (
    <StMyPageWrapper>
      <StMyPageRoomListWrapper>
        {roomList &&
          roomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              roomType={isLeader ? 'leader' : 'apply'}
              handleManage={
                isLeader ? () => handleManage(room.roomId) : undefined
              }
              handleEdit={isLeader ? () => handleEdit(room.roomId) : undefined}
            />
          ))}
      </StMyPageRoomListWrapper>
      <StManageModalWrapper $showing={manage.isShowing}>
        <ManageModal
          roomId={roomId}
          isShowing={manage.isShowing}
          handleConfirm={manage.toggle}
          handleCancel={manage.toggle}
        />
      </StManageModalWrapper>
      <StEditModalWrapper $showing={edit.isShowing}>
        <EditModal
          roomId={roomId}
          isShowing={edit.isShowing}
          handleConfirm={() => {
            edit.toggle();
            editConfirm.toggle();
          }}
          handleCancel={edit.toggle}
        />
      </StEditModalWrapper>
      <StEditConfirmModalWrapper $showing={editConfirm.isShowing}>
        <SmallModal
          title="스터디 정보 수정 완료"
          isShowing={editConfirm.isShowing}
        >
          <StSmallModalWrapper>
            <StContentWrapper>
              <IcCharacterCheck />
              <p>스터디 정보 수정이 완료되었어요.</p>
            </StContentWrapper>
            <ConfirmButton btnName="확인" onClick={editConfirm.toggle} />
          </StSmallModalWrapper>
        </SmallModal>
      </StEditConfirmModalWrapper>
    </StMyPageWrapper>
  );
};

export default MyPageStudyRoomList;

const StMyPageWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export const StMyPageRoomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  max-width: 76.5rem;

  margin-top: 4.6rem;
  margin-bottom: 8rem;
`;

export const StManageModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;

const StEditModalWrapper = styled(StManageModalWrapper)``;

const StEditConfirmModalWrapper = styled(StManageModalWrapper)``;

const StSmallModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.6rem;
`;

const StContentWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-left: -3rem;
  }

  & > p {
    margin-top: 1rem;
    margin-left: -2rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
    font-size: 1.5rem;
  }
`;
