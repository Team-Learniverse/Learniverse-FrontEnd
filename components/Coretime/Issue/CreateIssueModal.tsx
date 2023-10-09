import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { CreateIssue } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { roomIdState } from '@/recoil/atom';
import { PostIssueInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const CreateIssueModal = ({ isShowing, handleCancel }: Props) => {
  const roomId = useRecoilValue(roomIdState);
  // const memberId = useRecoilValue(memberIdState);

  const [ntitle, setNTitle] = useState('');
  const [ncontent, setNContent] = useState('');
  const [GithubCodeURL, setGithubCodeURL] = useState('');
  const [GithubRepoURL, setGithubRepoURL] = useState('');
  const [issueInfo, setIssueInfo] = useState<PostIssueInfo>();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputHeight = () => {
    if (inputRef && inputRef.current && inputRef.current.scrollHeight < 10) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}rem`;
    }
  };

  const initData = () => {
    setNTitle('');
    setNContent('');
    setGithubCodeURL('');
    setGithubRepoURL('');
  };

  const handleIssue = async () => {
    console.log('이슈 생성');
    await CreateIssue(issueInfo!);
    handleCancel();
  };

  useEffect(() => {
    setIssueInfo({
      roomId,
      memberId: 7,
      issueTitle: ntitle,
      issueDescription: ncontent,
      issueGitUrl: GithubRepoURL,
      gitFileName: GithubCodeURL,
    });
  }, [ntitle, ncontent, GithubRepoURL, GithubCodeURL]);

  return (
    isShowing && (
      <LargeModal title="이슈 생성하기" isShowing={isShowing}>
        <StCreateIssueModalWrapper>
          <StInputWrapper>
            <StInput>
              <p>이슈명</p>
              <input
                type="text"
                value={ntitle}
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  setNTitle(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>내용</p>
              <textarea
                value={ncontent}
                ref={inputRef}
                placeholder="내용을 입력하세요."
                onKeyDown={handleInputHeight}
                onKeyUp={handleInputHeight}
                onChange={(e) => {
                  setNContent(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>깃허브 레포 주소</p>
              <input
                type="text"
                value={GithubRepoURL}
                placeholder="https://github.com/ 이하 주소만 입력하세요."
                onChange={(e) => {
                  setGithubRepoURL(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>깃허브 코드 링크</p>
              <input
                type="text"
                value={GithubCodeURL}
                pattern=".+"
                placeholder="레포지토리내 소스코드 파일명을 입력하세요. (index.ts)"
                onChange={(e) => {
                  setGithubCodeURL(e.target.value);
                }}
              />
            </StInput>
          </StInputWrapper>

          <StBtnWrapper>
            <ConfirmButton btnName="만들기" onClick={handleIssue} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                initData();
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StCreateIssueModalWrapper>
      </LargeModal>
    )
  );
};

export default CreateIssueModal;

const StCreateIssueModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem 3.8rem;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }

  & > input {
    margin: 1.2rem;
    width: 32.6rem;
    height: 3.2rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > textarea {
    margin: 1.2rem;
    width: 32.6rem;
    height: 10rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
