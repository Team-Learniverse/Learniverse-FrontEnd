import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getIssueList } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import IssueCard from '@/components/Studyroom/IssueCard';
import { roomIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  handleClick: () => void;
  handleCreate: () => void;
  handleCancel: () => void;
}

const IssueModal = ({
  isShowing,
  handleClick,
  handleCreate,
  handleCancel,
}: Props) => {
  const roomID = useRecoilValue(roomIdState);
  const [issueList, setIssueList] = useState<IssueInfo[]>();

  const getIssues = async () => {
    const issueInfo = await getIssueList(roomID);
    console.log(issueInfo);

    setIssueList(issueInfo);
  };

  const handleCreateIssue = () => {
    handleCreate();
    console.log('이슈 생성창');
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    isShowing && (
      <LargeModal title="이슈 리스트" isShowing={isShowing}>
        <StIssueWrapper>
          <StIssue>
            {issueList &&
              issueList.map((issue: IssueInfo) => (
                <IssueCard
                  // eslint-disable-next-line react/jsx-boolean-value
                  core={true}
                  key={issue.issueId}
                  handleDiscuss={handleClick}
                  issueInfo={issue}
                />
              ))}
          </StIssue>

          <StBtnWrapper>
            <ConfirmButton
              btnName="이슈 생성하기"
              onClick={handleCreateIssue}
            />
            <CancelButton
              btnName="취소"
              onClick={() => {
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StIssueWrapper>
      </LargeModal>
    )
  );
};

export default IssueModal;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5rem 3.4rem 2.4rem 3.4rem;
  box-sizing: border-box;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StIssue = styled.div`
  display: flex;
  flex-direction: column;
  height: 19rem;

  margin-top: 2rem;
  margin-bottom: 1.4rem;

  & > div {
    display: flex;
    margin-top: 1rem;
  }

  & > div > svg {
    cursor: pointer;
  }

  & > hr {
    margin-top: 1rem;

    background-color: ${({ theme }) => theme.colors.Learniverse_BG};
  }

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
