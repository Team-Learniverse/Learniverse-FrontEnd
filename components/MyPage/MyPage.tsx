import Image from "next/image";
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { useGetMemberProfile, useGetMoon } from "@/hooks/members";
import {
  IcMoon0,
  IcMoon1,
  IcMoon2,
  IcMoon3,
  IcMoon4,
  IcMoonBox,
  IcProfileImage
} from "@/public/assets/icons";
import { memberIdState } from "@/recoil/atom";

import { MyPageStudyRoomList } from "../RoomList";

const MyPage = () => {
  const memberId = useRecoilValue(memberIdState);
  const [activeTab, setActiveTab] = useState(0);
  const [isLeader, setIsLeader] = useState(true);
  const [moonScores, setMoonScores] = useState<number[]>([]);

  const { imgUrl, nickname } = useGetMemberProfile(memberId);
  const { moons, isLoading } = useGetMoon(memberId);

  const getMoonScores = () => {
    const scores = moons?.map((moon) => moon.moonScore) || [];
    setMoonScores(scores);
  };

  const matchMoonIcons = () => {
    if (!Array.isArray(moonScores)) return [];

    const reversedMoonScores = [...moonScores].reverse();

    return reversedMoonScores.map((score, index) => {
      switch (score) {
        case 0:
          return <IcMoon0 key={index} />;
        case 1:
          return <IcMoon1 key={index} />;
        case 2:
          return <IcMoon2 key={index} />;
        case 3:
          return <IcMoon3 key={index} />;
        case 4:
          return <IcMoon4 key={index} />;
        default:
          return null;
      }
    });
  };

  const handleTabClick = (tabValue: number) => {
    if (activeTab !== tabValue) {
      setActiveTab(tabValue);
    }
  };

  useEffect(() => {
    getMoonScores();
  }, [isLoading]);

  useEffect(() => {
    setIsLeader(activeTab === 0);
  }, [activeTab]);

  return (
    <StMyPageWrapper>
      <h2>마이페이지</h2>
      <StMyInfo>
        {imgUrl && nickname && (
          <StProfile>
            <IcProfileImage />
            <Image
              className="githubImage"
              src={imgUrl}
              alt="profile"
              width={77}
              height={70}
            />
            <p>{nickname}</p>
          </StProfile>
        )}
        <StMoon>
          <p>나의 달</p>
          <IcMoonBox className="box" />
          <StMoonWrapper>{matchMoonIcons()}</StMoonWrapper>
        </StMoon>
      </StMyInfo>
      <StTabs>
        <button
          type="button"
          onClick={() => handleTabClick(0)}
          className={activeTab === 0 ? 'active' : ''}
        >
          내가 만든 스터디룸
        </button>
        <button
          type="button"
          onClick={() => handleTabClick(1)}
          className={activeTab === 1 ? 'active' : ''}
        >
          내가 신청한 스터디룸
        </button>
      </StTabs>
      <MyPageStudyRoomList isLeader={isLeader} />
    </StMyPageWrapper>
  );
};

export default MyPage;

const StMyPageWrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding: 3.59rem 12rem 0 12rem;

  & > h2 {
    width: fit-content;

    background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
    background-clip: text;
    ${({ theme }) => theme.fonts.Head0};

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StMyInfo = styled.section`
  display: flex;
  justify-content: center;
  gap: 12.2rem;
`;

const StProfile = styled.div`
  position: relative;

  & > .githubImage {
    position: absolute;
    top: 7.7rem;
    left: 6.45rem;

    border-radius: 10rem;
  }
  & > p {
    margin-top: -1rem;

    color: ${({ theme }) => theme.colors.Purple2};
    ${({ theme }) => theme.fonts.Title1};
    text-align: center;
  }
`;

const StMoon = styled.div`
  width: 40.5rem;
  position: relative;

  & > span {
    color: white;
    ${({ theme }) => theme.fonts.Body2};
  }
  & > p {
    width: fit-content;
    margin-bottom: 0.9rem;

    background: linear-gradient(90deg, #fff 0%, #ffbf00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${({ theme }) => theme.fonts.Head2};
  }

  .box {
    position: absolute;
    top: 4.5rem;
    left: -1rem;
  }
`;

const StMoonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
  gap: 1rem;

  padding-top: 2.5rem;
  padding-left: 1.3rem;

  max-width: 35rem;
  box-sizing: border-box;

  z-index: 10;
`;

const StTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 4.4rem;
  margin-top: 2.7rem;

  & > button {
    color: ${({ theme }) => theme.colors.Gray3};
    ${({ theme }) => theme.fonts.Title1};

    &.active {
      color: ${({ theme }) => theme.colors.SkyBlue};
    }
  }
`;
