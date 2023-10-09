import { styled } from 'styled-components';

import CoreTimeSet from './CoreTimeSet';
import Issue from './Issue';
import MemberList from './MemberList';
import Notice from './Notice';
import WorkSpace from './Workspace';

const Studyroom = () => {
  return (
    <StStudyroomWrapper>
      <StTopWrapper>
        <StIssueWrapper>
          <Issue />
        </StIssueWrapper>
        <StWorkspaceWrapper>
          <WorkSpace />
        </StWorkspaceWrapper>
        <StMembersWrapper>
          <MemberList />
        </StMembersWrapper>
      </StTopWrapper>
      <StBottomWrapper>
        <StNoticeWrapper>
          <Notice />
        </StNoticeWrapper>
        <StCoretimeWrapper>
          <CoreTimeSet />
        </StCoretimeWrapper>
      </StBottomWrapper>
    </StStudyroomWrapper>
  );
};

export default Studyroom;

const StStudyroomWrapper = styled.main`
  grid-template-rows: 1fr 1fr;

  /* display: flex;
  justify-content: space-between; */

  width: 100%;
  padding: 1.5rem 6.5rem 0 6.5rem;
  box-sizing: border-box;
`;

const StTopWrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 1rem;
`;
const StBottomWrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 1rem;
`;

const StIssueWrapper = styled.div`
  margin: 1.4rem;
  height: 25.6rem;
  width: 51.8rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StWorkspaceWrapper = styled.div`
  margin: 1.4rem;
  height: 25.6rem;
  width: 24.5rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StNoticeWrapper = styled.div`
  margin: 1.4rem;
  width: 79.8rem;
  height: 33.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StMembersWrapper = styled.div`
  margin: 1.4rem;
  height: 25.6rem;
  width: 41.8rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StCoretimeWrapper = styled.div`
  margin: 1.4rem;
  height: 33.4rem;
  width: 41.8rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;
