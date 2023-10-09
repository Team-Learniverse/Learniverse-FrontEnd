import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { createRoom } from "@/apis/roomList";
import { getLanguages } from "@/apis/studyroom";
import { IcAddTag, IcDeleteTag, IcLanguages } from "@/public/assets/icons";
import { encodedUrlState, memberIdState } from "@/recoil/atom";
import { PostStudyRoomInfo } from "@/types/studyroom";

import { CancelButton, ConfirmButton } from "../../Common/Button";
import { LargeModal } from "../../Common/Modal";
import Checkbox from "./CheckBox";

interface AddStudyroomModalProps {
  isShowing: boolean;
  handleCreate: () => void;
  handleCancel: () => void;
}

const AddStudyroomModal = ({
  isShowing,
  handleCreate,
  handleCancel,
}: AddStudyroomModalProps) => {
  const [studyName, setStudyName] = useState('');
  const [category, setCategory] = useState(5);
  const [hashtag, setHashtag] = useState('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [member, setMember] = useState(2);
  const [introduction, setIntroduction] = useState('');
  const [addRoomInfo, setAddRoomInfo] = useState<PostStudyRoomInfo>();
  const setEncodedUrl = useSetRecoilState(encodedUrlState);
  const memberId = useRecoilValue(memberIdState);

  const getLanguageData = async () => {
    const languageData = await getLanguages();
    setLanguages(languageData);
  };

  const initInfo = () => {
    setStudyName('');
    setCategory(5);
    setHashtag('');
    setHashtagList([]);
    setMember(2);
    setIntroduction('');
    setAddRoomInfo(undefined);
  };

  const handleAddRoom = async () => {
    if (!studyName || hashtagList.length === 0) {
      alert('스터디명, 해시태그 입력은 필수입니다.');
      return;
    }
    if (member > 5 || member < 2) {
      alert('스터디룸 정원은 최소 2명 ~ 최대 5명입니다');
      return;
    }
    const url = addRoomInfo ? await createRoom(addRoomInfo) : '';
    setEncodedUrl(url);
    handleCreate();
    initInfo();
  };

  const handleHashtag = () => {
    if (hashtag) {
      setHashtagList((prev) => [...prev, hashtag]);
      setHashtag('');
    }
  };
  const handleRemoveHashtag = (index: number) => {
    setHashtagList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isShowing) {
      getLanguageData();
    }
  }, [isShowing]);

  useEffect(() => {
    setAddRoomInfo({
      memberId,
      roomName: studyName,
      roomCategory: category,
      roomLanguages: selectedLanguages,
      roomIntro: introduction,
      roomLimit: member,
      roomHashtags: hashtagList,
    });
  }, [
    studyName,
    category,
    selectedLanguages,
    hashtagList,
    member,
    introduction,
  ]);

  return (
    isShowing && (
      <LargeModal title="스터디룸 만들기" isShowing={isShowing}>
        <StAddStudyroomModalWrapper>
          <StInputStudyName>
            <label htmlFor="studyName">스터디명</label>
            <input
              type="text"
              id="studyName"
              name="studyName"
              value={studyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStudyName(e.target.value);
              }}
              autoComplete="off"
            />
          </StInputStudyName>

          <StCategory>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategory(parseInt(e.target.value, 10));
              }}
            >
              <option value="5">기타</option>
              <option value="0">코딩테스트 대비</option>
              <option value="1">사이드 프로젝트</option>
              <option value="2">취업 준비</option>
              <option value="3">개발 공부</option>
              <option value="4">그룹/모임</option>
            </select>
          </StCategory>

          <StLanguages>
            <label htmlFor="language-checkbox">개발 언어(선택)</label>
            <StLanguageWrapper>
              {languages.map((lang) => (
                <Checkbox
                  key={lang}
                  language={lang}
                  setSelectedLanguages={setSelectedLanguages}
                />
              ))}
              <IcLanguages />
            </StLanguageWrapper>
          </StLanguages>

          <StHashtag>
            <label htmlFor="hashtag">해시태그</label>
            <div>
              <input
                type="text"
                id="hashtag"
                name="hashtag"
                value={hashtag}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setHashtag(e.target.value);
                }}
                autoComplete="off"
              />
              <StAddTagBtn type="button" onClick={handleHashtag}>
                <IcAddTag />
              </StAddTagBtn>
              <StHashtagList>
                {hashtagList.map((tag, index) => (
                  <StHashtagItem key={tag}>
                    # {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(index)}
                    >
                      <IcDeleteTag />
                    </button>
                  </StHashtagItem>
                ))}
              </StHashtagList>
            </div>
          </StHashtag>

          <StMember>
            <label htmlFor="member">정원 (최대 5명)</label>
            <div>
              <input
                type="number"
                id="member"
                name="member"
                value={member}
                min={2}
                max={5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMember(parseInt(e.target.value, 10));
                }}
                autoComplete="off"
              />
              명
            </div>
          </StMember>

          <StIntro>
            <label htmlFor="introduction">한줄소개 (선택)</label>
            <input
              type="text"
              id="introduction"
              name="introduction"
              value={introduction}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIntroduction(e.target.value);
              }}
              autoComplete="off"
            />
          </StIntro>

          <StBtnWrapper>
            <ConfirmButton btnName="만들기" onClick={handleAddRoom} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                initInfo();
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StAddStudyroomModalWrapper>
      </LargeModal>
    )
  );
};

export default AddStudyroomModal;

const StAddStudyroomModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.3rem 4.6rem;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StInputStudyName = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;

  width: 100%;
  margin-bottom: 2.1rem;

  & > label {
    width: 12.2rem;
    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
  }
  & > input,
  & > div > input {
    width: 35.5rem;
    height: 3.2rem;
    padding-left: 1rem;
    box-sizing: border-box;

    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StCategory = styled(StInputStudyName)`
  & > select {
    width: 16.5rem;
    height: 3.2rem;
    padding: 0 1rem;

    border: none;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StLanguages = styled(StInputStudyName)`
  position: relative;
  display: flex;
`;

const StLanguageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0rem 1rem;

  width: 35.5rem;
  height: 13rem;
  margin: 1.5rem 0;
  padding: 0rem 1.5rem;
  box-sizing: border-box;

  & > svg {
    z-index: -1;

    position: absolute;
    top: -1rem;
    right: -2rem;
  }
`;

const StHashtag = styled(StInputStudyName)`
  position: relative;

  & > div {
    max-width: 35.5rem;
  }
  & > div > input {
    width: 16.5rem;
  }
`;

const StAddTagBtn = styled.button`
  position: absolute;
  top: 1rem;
  left: 29rem;
`;

const StHashtagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
`;

const StHashtagItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: 3.3rem;
  padding: 0 0.8rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;

  border-radius: 15rem;
  color: ${({ theme }) => theme.colors.Gray1};
  background-color: ${({ theme }) => theme.colors.Yellow2};
  ${({ theme }) => theme.fonts.Body3};

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 0.5rem;
  }
`;

const StMember = styled(StInputStudyName)`
  & > div {
    float: left;

    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};

    & > input {
      width: 5.1rem;
      margin-right: 0.6rem;
    }
  }
`;

const StIntro = styled(StInputStudyName)``;
