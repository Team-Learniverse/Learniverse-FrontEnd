import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { getRoomList } from "@/apis/roomList";
import { memberIdState } from "@/recoil/atom";
import { StudyRoomInfo } from "@/types/studyroom";

import StudyroomCard from "../RoomCard/StudyroomCard";

const AllStudyroomList = () => {
  const [roomList, setRoomList] = useState<StudyRoomInfo[]>();
  const memberId = useRecoilValue(memberIdState);

  const getAllRoom = async () => {
    const rooms = await getRoomList(memberId);
    setRoomList(rooms);
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  return (
    <StStudyroomListWrapper>
      {roomList &&
        roomList.map((room) => (
          <StudyroomCard key={room.roomId} roomData={room} />
        ))}
    </StStudyroomListWrapper>
  );
};

export default AllStudyroomList;

const StStudyroomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 8.4rem;
  margin-bottom: 8rem;
`;
