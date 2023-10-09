import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getStudyroomWorkSpace, postWorkspace } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { roomIdState } from '@/recoil/atom';
import { PostWorkSpaceInfo, WorkSpaceInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const RegisterWorkspaceModal = ({ isShowing, handleCancel }: Props) => {
  const [NotnURL, setNotnURL] = useState('');
  const [GithubURL, setGithubURL] = useState('');
  const [FigmaURL, setFigmaURL] = useState('');
  const [GDriveURL, setGDriveURL] = useState('');
  const [workSpaceData, setWorkSpaceData] = useState<PostWorkSpaceInfo>();
  const roomID = useRecoilValue(roomIdState);

  const handleRegWS = async () => {
    console.log('워크스페이스 생성 및 수정');
    await postWorkspace(workSpaceData!);
    handleCancel();
  };

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

  useEffect(() => {
    setWorkSpaceData({
      roomId: roomID,
      roomGitOrg: GithubURL,
      roomNotion: NotnURL,
      roomGoogleDrive: GDriveURL,
      roomFigma: FigmaURL,
    });
  }, [GithubURL, NotnURL, GDriveURL, FigmaURL]);

  return (
    isShowing && (
      <LargeModal title="워크스페이스 설정하기" isShowing={isShowing}>
        <StWSModalWrapper>
          <StInputWrapper>
            <StInput>
              <p>노션</p>
              <input
                type="url"
                value={NotnURL}
                pattern="https?://www.notion.so/.+"
                placeholder="https://www.notion.so/로 시작하는 url을 입력하세요."
                onChange={(e) => {
                  setNotnURL(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>깃허브</p>
              <input
                type="url"
                value={GithubURL}
                pattern="https?://github.com/.+"
                placeholder="https://github.com/로 시작하는 url을 입력하세요."
                onChange={(e) => {
                  setGithubURL(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>피그마</p>
              <input
                type="url"
                value={FigmaURL}
                pattern="https?://www.figma.com/.+"
                placeholder="https://www.figma.com/로 시작하는 url을 입력하세요."
                onChange={(e) => {
                  setFigmaURL(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>구글 드라이브</p>
              <input
                type="url"
                value={GDriveURL}
                pattern="https?://drive.google.com/.+"
                placeholder="https://drive.google.com/로 시작하는 url을 입력하세요."
                onChange={(e) => {
                  setGDriveURL(e.target.value);
                }}
              />
            </StInput>
          </StInputWrapper>

          <StBtnWrapper>
            <ConfirmButton btnName="등록하기" onClick={handleRegWS} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                getWorkSpace();
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StWSModalWrapper>
      </LargeModal>
    )
  );
};

export default RegisterWorkspaceModal;

const StWSModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem 6.4rem;
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
  }

  & > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
