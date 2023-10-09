import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getStudyroomWorkSpace } from '@/apis/studyroom';
import useModal from '@/hooks/useModal';
import { IcPlusBtn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
import { WorkSpaceInfo } from '@/types/studyroom';

import { FigmaBtn, GDriveBtn, GithbBtn, NotnBtn } from '../Common/Button';
import RegisterWorkspaceModal from './Modal/RegisterWorkspaceModal';

const WorkSpace = () => {
  const register = useModal();

  const [NotnURL, setNotnURL] = useState('');
  const [GithubURL, setGithubURL] = useState('');
  const [FigmaURL, setFigmaURL] = useState('');
  const [GDriveURL, setGDriveURL] = useState('');

  const roomID = useRecoilValue(roomIdState);

  const getWorkSpace = async () => {
    const WSInfo: WorkSpaceInfo = await getStudyroomWorkSpace(roomID);
    const { roomGitOrg, roomNotion, roomGoogleDrive, roomFigma } = WSInfo;

    setNotnURL(roomNotion ? roomNotion.toString() : '');
    setGithubURL(roomGitOrg ? roomGitOrg.toString() : '');
    setFigmaURL(roomFigma ? roomFigma.toString() : '');
    setGDriveURL(roomGoogleDrive ? roomGoogleDrive.toString() : '');
  };

  useEffect(() => {
    getWorkSpace();
  }, []);

  const handleOpen = () => {
    register.toggle();
  };

  const handleWSAddress = (key: string) => {
    switch (key) {
      case 'notion':
        if (NotnURL !== '') {
          window.open(NotnURL);
        } else {
          alert('url을 등록해주세요.');
        }
        break;
      case 'gdrive':
        if (GDriveURL !== '') {
          console.log(GDriveURL);
        } else {
          alert('url을 등록해주세요.');
        }
        break;
      case 'github':
        if (GithubURL !== '') {
          window.open(GithubURL);
        } else {
          alert('url을 등록해주세요.');
        }
        break;
      case 'figma':
        if (FigmaURL !== '') {
          window.open(FigmaURL);
        } else {
          alert('url을 등록해주세요.');
        }
        break;
      default:
        window.open(GDriveURL);
    }
  };

  return (
    <>
      <StWorkspaceWrapper>
        <StTitleWrapper>
          <h2>워크 스페이스</h2>
          <IcPlusBtn type="button" onClick={handleOpen} />
        </StTitleWrapper>
        <Workspace>
          <NotnBtn
            key={0}
            handleClick={() => {
              handleWSAddress('notion');
            }}
          />
          <GDriveBtn
            key={1}
            handleClick={() => {
              handleWSAddress('gdrive');
            }}
          />
          <GithbBtn
            key={2}
            handleClick={() => {
              handleWSAddress('github');
            }}
          />
          <FigmaBtn
            key={3}
            handleClick={() => {
              handleWSAddress('figma');
            }}
          />
        </Workspace>
      </StWorkspaceWrapper>
      <StRegModalWrapper $showing={register.isShowing}>
        <RegisterWorkspaceModal
          isShowing={register.isShowing}
          handleCancel={register.toggle}
        />
      </StRegModalWrapper>
    </>
  );
};

export default WorkSpace;

const StWorkspaceWrapper = styled.div`
  margin: 2.3rem;
`;

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }

  cursor: pointer;
`;

const Workspace = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  justify-items: center;
  align-items: center;

  margin-top: 3.1rem;
`;

const StRegModalWrapper = styled.div<{ $showing: boolean }>`
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
