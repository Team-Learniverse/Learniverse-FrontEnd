import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { IcIssueLogo } from '@/public/assets/icons';
import { issueIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

import CloseIssueModal from './Modal/CloseIssueModal';

interface Props {
  core: boolean;
  handleDiscuss: () => void;
  issueInfo: IssueInfo;
}

const IssueCard = ({ core, handleDiscuss, issueInfo }: Props) => {
  const iDelete = useModal();

  const { issueId, issueTitle, issueDescription, issueOpen } = issueInfo;
  const setIssueID = useSetRecoilState(issueIdState);

  return (
    <>
      <StIssueWrapper>
        <div>
          <IcIssueLogo
            type="button"
            onClick={() => {
              setIssueID(issueId);
              handleDiscuss();
            }}
          />
          <StContent $core={core}>
            <h3>{issueTitle}</h3>
            <p>{issueDescription}</p>
          </StContent>
          {issueOpen ? (
            <StBtn onClick={iDelete.toggle} $issueOpen={issueOpen}>
              CLOSE
            </StBtn>
          ) : (
            <StBtn $issueOpen={issueOpen}>CLOSED</StBtn>
          )}
        </div>
        <hr />
      </StIssueWrapper>
      <StCloseIssueModalWrapper $showing={iDelete.isShowing}>
        <CloseIssueModal
          isShowing={iDelete.isShowing}
          issueId={issueId}
          handleCancel={iDelete.toggle}
        />
      </StCloseIssueModalWrapper>
    </>
  );
};

export default IssueCard;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1.4rem;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;

    position: relative;
  }

  & > div > svg {
    cursor: pointer;
  }

  & > hr {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StContent = styled.div<{ $core: boolean }>`
  & > h3 {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ $core }) => ($core ? '#1E1F3B' : '#FFFFFF')};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > p {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ $core }) => ($core ? '#1E1F3B' : '#FFFFFF')};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StBtn = styled.button<{ $issueOpen: boolean }>`
  width: 6rem;
  height: 2.5rem;

  position: absolute;
  right: 1rem;

  border-radius: 30rem;

  background-color: ${({ $issueOpen }) => ($issueOpen ? '#F14E1C' : '#A9A9A9')};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body4};
`;

const StCloseIssueModalWrapper = styled.div<{ $showing: boolean }>`
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
