import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { useGetMyStudyRoomList } from "@/hooks/StudyRooms";
import { memberIdState } from "@/recoil/atom";

import { PurpleButton } from "../Common/Button";
import AddStudyroom from "../RoomCard/AddStudyroom";
import StudyroomCard from "../RoomCard/StudyroomCard";
import { StudyroomListSkeleton } from "./Skeleton";

export const MyStudyroomList = () => {
  const router = useRouter();
  const memberId = useRecoilValue(memberIdState);

  const { myStudyRoomList } = useGetMyStudyRoomList(memberId);

  return (
    <StStudyroomListWrapper>
      <StHomeTitle>
        <h2>나의 스터디룸</h2>
        <PurpleButton
          btnName="🔍  스터디 검색하기"
          handleClick={() => {
            router.push('/search');
          }}
        />
      </StHomeTitle>
      {myStudyRoomList ? (
        <StStudyroomList>
          <AddStudyroom />
          {myStudyRoomList.pinRooms &&
            myStudyRoomList.pinRooms.map((room) => (
              <StudyroomCard
                key={room.roomId}
                roomData={room}
                isPinned
                isMyroom
              />
            ))}
          {myStudyRoomList.rooms &&
            myStudyRoomList.rooms.map((room) => (
              <StudyroomCard
                key={room.roomId}
                roomData={room}
                isPinned={false}
                isMyroom
              />
            ))}
        </StStudyroomList>
      ) : (
        <StudyroomListSkeleton />
      )}
    </StStudyroomListWrapper>
  );
};

export default MyStudyroomList;

const StStudyroomListWrapper = styled.section`
  margin-top: 8.4rem;
`;

const StStudyroomList = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 2rem;
  margin-bottom: 8rem;
`;

const StHomeTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;
