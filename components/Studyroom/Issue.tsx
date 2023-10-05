import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getIssueList } from '@/apis/studyroom';
import useModal from '@/hooks/useModal';
import { IcPlusBtn, IcToggleOff, IcToggleOn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

import { DiscussIssueModal } from '../Coretime/Issue';
import CreateIssueModal from '../Coretime/Issue/CreateIssueModal';
import IssueCard from './IssueCard';

const Issue = () => {
  const cIssue = useModal();
  const discuss = useModal();

  const roomID = useRecoilValue(roomIdState);
  const [issueList, setIssueList] = useState<IssueInfo[]>();
  const [showClosed, setshowClosed] = useState(true);

  const getIssues = async () => {
    const issueInfo = await getIssueList(roomID);

    setIssueList(issueInfo);
  };

  const handleOpenIssue = () => {
    cIssue.toggle();
  };

  const handleToggle = () => {
    setshowClosed(!showClosed);
  };

  const handleDiscuss = () => {
    discuss.toggle();
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      <StIsuueWrapper>
        <StTitleWrapper>
          <h2>이슈</h2>
          <button type="button" onClick={handleToggle}>
            <p>CLOSED</p> {showClosed ? <IcToggleOn /> : <IcToggleOff />}
          </button>
          <IcPlusBtn type="button" onClick={handleOpenIssue} />
        </StTitleWrapper>
        <StIssue>
          {issueList &&
            issueList.map(
              (issue: IssueInfo) =>
                (showClosed || issue.issueOpen) && (
                  <IssueCard
                    core={false}
                    key={issue.issueId}
                    handleDiscuss={handleDiscuss}
                    issueInfo={issue}
                  />
                ),
            )}
        </StIssue>
      </StIsuueWrapper>
      <StCreateIssueModalWrapper $showing={cIssue.isShowing}>
        <CreateIssueModal
          isShowing={cIssue.isShowing}
          handleCancel={cIssue.toggle}
        />
      </StCreateIssueModalWrapper>
      <StDiscussIssueModalWrapper $showing={discuss.isShowing}>
        <DiscussIssueModal
          isShowing={discuss.isShowing}
          handleCancel={discuss.toggle}
        />
      </StDiscussIssueModalWrapper>
    </>
  );
};

export default Issue;

const StTitleWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  & > button {
    display: flex;
    align-items: center;
    margin-left: 2rem;

    & > p {
      margin-right: 1rem;
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Body1};
    }
  }

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }

  & > svg {
    position: absolute;
    right: 0rem;
    cursor: pointer;
  }
`;

const StIsuueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 2.2rem 0 2.2rem;
`;

const StIssue = styled.div`
  display: flex;
  flex-direction: column;

  height: 19rem;
  margin-bottom: 1.4rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StCreateIssueModalWrapper = styled.div<{ $showing: boolean }>`
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

const StDiscussIssueModalWrapper = styled.div<{ $showing: boolean }>`
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
