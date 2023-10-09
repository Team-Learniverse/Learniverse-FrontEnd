import { useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { applyRoom } from "@/apis/studyroom";
import useModal from "@/hooks/useModal";
import { memberIdState } from "@/recoil/atom";

import { PurpleButton } from "../Common/Button";
import ApplyCompleteModal from "./ApplyCompleteModal/ApplyCompleteModal";
import RecommendStudy from "./Recommend/Recommend";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const Search = () => {
  const curMemberId = useRecoilValue(memberIdState);
  const [selectedInput, setSelectedInput] = useState(0);
  const [currentSearchInput, setCurrentSearchInput] = useState<string>('');
  const [searched, setSearched] = useState(false);

  const recommendModal = useModal();
  const applyModal = useModal();

  const handleSearch = async (searchInput: string) => {
    setSearched(true);
    setCurrentSearchInput(searchInput);
  };

  const handleApply = async (roomId: number) => {
    await applyRoom(roomId, curMemberId);
  };

  const handleApplyClick = async (roomId: number) => {
    handleApply(roomId);
    applyModal.toggle();
  };

  return (
    <StSearchWrapper>
      <h1>스터디 검색</h1>
      <SearchInput
        handleSearch={handleSearch}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
      />
      <PurpleButton
        btnName="✨ 나와 맞는 스터디 추천받기"
        handleClick={recommendModal.toggle}
      />
      <SearchResult
        searched={searched}
        searchType={selectedInput === 0 ? 'search' : 'hashtag'}
        keyword={currentSearchInput}
        memberId={curMemberId}
        handleApply={handleApplyClick}
      />
      <ApplyCompleteModal
        isShowing={applyModal.isShowing}
        toggleModal={applyModal.toggle}
      />
      <RecommendStudy
        isShowing={recommendModal.isShowing}
        toggleModal={recommendModal.toggle}
        handleApply={handleApply}
      />
    </StSearchWrapper>
  );
};

export default Search;

const StSearchWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.59rem 12rem 0 12rem;

  & > h1 {
    width: 100%;
    text-align: left;
    background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
    background-clip: text;
    ${({ theme }) => theme.fonts.Head0};

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
