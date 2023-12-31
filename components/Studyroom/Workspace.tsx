import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { useModal } from '@/hooks/Common';
import { useGetStudyRoomWorkSpace } from '@/hooks/StudyRooms';
import { IcPlusBtn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';

import { FigmaBtn, GDriveBtn, GithbBtn, NotnBtn } from '../Common/Button';
import RegisterWorkspaceModal from './Modal/RegisterWorkspaceModal';

const WorkSpace = () => {
  const register = useModal();

  const [NotnURL, setNotnURL] = useState('');
  const [GithubURL, setGithubURL] = useState('');
  const [FigmaURL, setFigmaURL] = useState('');
  const [GDriveURL, setGDriveURL] = useState('');

  const roomID = useRecoilValue(roomIdState);
  const { workSpaceList, isLoading } = useGetStudyRoomWorkSpace(roomID);

  const getWorkSpace = async () => {
    if (!isLoading) {
      const { roomFigma, roomGitOrg, roomGoogleDrive, roomNotion } =
        workSpaceList!;

      setNotnURL(roomNotion ? roomNotion.toString() : '');
      setGithubURL(roomGitOrg ? roomGitOrg.toString() : '');
      setFigmaURL(roomFigma ? roomFigma.toString() : '');
      setGDriveURL(roomGoogleDrive ? roomGoogleDrive.toString() : '');
    }
  };

  useEffect(() => {
    getWorkSpace();
  }, [workSpaceList]);

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
          window.open(GDriveURL);
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
          <h2>워크스페이스</h2>
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
  grid-row-gap: 2rem;

  justify-items: center;
  justify-content: center;
  align-items: center;

  margin-top: 3.1rem;
  margin-left: 2rem;
  margin-right: 1rem;
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
