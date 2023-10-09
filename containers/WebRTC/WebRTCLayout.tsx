/* eslint-disable prettier/prettier */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { getPresignedUrl } from '@/apis/alarm';
import { createCapture, putFile } from '@/apis/coretimes';
import { Chatting } from '@/components/Coretime/Chatting';
import { GalleryModal } from '@/components/Coretime/Gallery';
import {
  CreateIssueModal,
  DiscussIssueModal,
  IssueModal,
} from '@/components/Coretime/Issue';
import { Member } from '@/components/Coretime/Member';
import {
  CaptureCompleteModal,
  CaptureModal,
  ExitCoretimeModal,
} from '@/components/Coretime/Modal';
import {
  MediaBtn,
  MikeBtn,
  SpeakerBtn,
  StudyroomBtn,
} from '@/components/Coretime/Setting';
import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import { WebRTCAudio, WebRTCVideo } from '@/components/Coretime/WebRTCMedia';
import useModal, { UseModalReturnType } from '@/hooks/useModal';
import { ChattingInfo, ConsumeInfo, RoomPeerInfo } from '@/types/socket';
import { formatHHMMSS } from '@/utils/getFormattedTime';

interface WebRTCLayoutProps {
  captureTime: number;
  coreEndTime: Date;
  curNickname: string;
  curRoomId: string;
  curMemberId: string;
  isMedia: boolean;
  handleMedia: () => void;
  isMike: boolean;
  handleMike: () => void;
  isSpeaker: boolean;
  handleSpeaker: () => void;
  selectedVideo: string | null;
  chatting: string;
  setChatting: Dispatch<SetStateAction<string>>;
  curMembers: RoomPeerInfo[];
  videoStreams: ConsumeInfo[];
  audioStreams: ConsumeInfo[];
  handleSelectVideo: (stream: ConsumeInfo) => void;
  chattingList: ChattingInfo[];
  handleSendChatting: () => void;
  handleExitRoom: () => void;
  issue: UseModalReturnType;
}

// TODO : 전면 리팩토링
const WebRTCLayout = ({
  captureTime,
  coreEndTime,
  curNickname,
  curRoomId,
  curMemberId,
  isMedia,
  handleMedia,
  isMike,
  handleMike,
  isSpeaker,
  handleSpeaker,
  selectedVideo,
  chatting,
  setChatting,
  curMembers,
  videoStreams,
  audioStreams,
  handleSelectVideo,
  chattingList,
  handleSendChatting,
  handleExitRoom,
  issue,
}: WebRTCLayoutProps) => {
  const cIssue = useModal();
  const discuss = useModal();
  const [isSending, setIsSending] = useState(false);
  const [capturedImageFile, setCapturedImageFile] = useState<
    File | undefined
  >();
  const [isEnter, setIsEnter] = useState(false);

  const gallery = useModal();
  const exit = useModal();
  const capture = useModal();
  const captureComplete = useModal();

  const handleChatSend = async () => {
    if (isSending) return;

    setIsSending(true);
    await handleSendChatting();
    setIsSending(false);
  };

  const handleCreateIssue = () => {
    issue.toggle();
    cIssue.toggle();
  };

  const handleDiscuss = () => {
    issue.toggle();
    discuss.toggle();
  };

  const handleUploadImage = async () => {
    const now = new Date();

    const captureData = {
      coreTimeId: Number(curRoomId),
      memberId: Number(curMemberId),
      fileName: `coretime-${curRoomId}-${curNickname}-${formatHHMMSS(
        now.toString(),
      )}.png`,
    };

    const url: string = await getPresignedUrl(captureData.fileName);
    if (capturedImageFile) {
      await putFile(url, capturedImageFile);
      await createCapture(captureData);
    }
  };

  const handleSubmit = () => {
    handleUploadImage();
    capture.toggle();
    captureComplete.toggle();
    setCapturedImageFile(undefined);
  };

  useEffect(() => {
    if (captureTime === 0 && !isEnter) {
      setIsEnter(true);
      return;
    }
    if (isEnter) {
      capture.setShowing(true);
    }
  }, [captureTime]);

  return (
    <StWebRTCContainerWrapper>
      <StMediaContainer>
        <StSettingWrapper>
          <StSettingBtnWrapper>
            <TimeProvider coreEndTime={coreEndTime}>
              <Timer />
            </TimeProvider>
            <MediaBtn isMedia={isMedia} handleMedia={handleMedia} />
            <MikeBtn isMike={isMike} handleMike={handleMike} />
            <SpeakerBtn isSpeaker={isSpeaker} handleSpeaker={handleSpeaker} />
          </StSettingBtnWrapper>
          <StStudyroomBtnWrapper>
            <StudyroomBtn name="issue" handleClick={issue.toggle} />
            <StudyroomBtn name="gallery" handleClick={gallery.toggle} />
          </StStudyroomBtnWrapper>
        </StSettingWrapper>
        <StMediaWrapper>
          {videoStreams.map((stream) => (
            <WebRTCVideo
              key={stream.consumer_id}
              roomId={curRoomId!}
              // memberId={curMemberId!}
              nickname={stream.nickname}
              mediaStream={stream.stream}
              captureTime={captureTime}
              setCapturedImageFile={setCapturedImageFile}
              isSelected={selectedVideo === stream.consumer_id}
              onClick={() => handleSelectVideo(stream)}
            />
          ))}
          {audioStreams.map((stream) => (
            <WebRTCAudio
              key={stream.consumer_id}
              mediaStream={stream.stream}
              ismuted={!isSpeaker}
            />
          ))}
        </StMediaWrapper>
      </StMediaContainer>
      <StCoretimeInfoWrapper>
        <Member curMembers={curMembers} />
        <StChattingWrapper>
          <Chatting curNickname={curNickname} chattingList={chattingList} />
          <StChatInputWrapper>
            <StChatInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chatting || ''}
              onChange={(e) => setChatting(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && chatting.trim()) {
                  e.preventDefault();
                  handleChatSend();
                }
              }}
            />
            <button type="button" onClick={handleSendChatting}>
              전송
            </button>
          </StChatInputWrapper>
        </StChattingWrapper>
        <StCoreTimeBtnWrapper>
          <StExitButton type="button" onClick={exit.toggle}>
            코어타임 나가기
          </StExitButton>
        </StCoreTimeBtnWrapper>
      </StCoretimeInfoWrapper>
      <StIssueModalWrapper $showing={issue.isShowing}>
        <IssueModal
          isShowing={issue.isShowing}
          handleClick={handleDiscuss}
          handleCreate={handleCreateIssue}
          handleCancel={issue.toggle}
        />
      </StIssueModalWrapper>
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
      <StModalWrapper $showing={gallery.isShowing}>
        <GalleryModal
          curRoomId={curRoomId!}
          isShowing={gallery.isShowing}
          handleCancel={gallery.toggle}
        />
      </StModalWrapper>
      <StModalWrapper $showing={exit.isShowing}>
        <ExitCoretimeModal
          isShowing={exit.isShowing}
          handleExit={handleExitRoom}
          handleCancel={exit.toggle}
        />
      </StModalWrapper>
      <StModalWrapper $showing={capture.isShowing}>
        <CaptureModal
          isShowing={capture.isShowing}
          setShowing={capture.setShowing}
          imageFile={capturedImageFile!}
          handleSubmit={handleSubmit}
          handleCancel={capture.toggle}
        />
      </StModalWrapper>
      <StModalWrapper $showing={captureComplete.isShowing}>
        <CaptureCompleteModal
          isShowing={captureComplete.isShowing}
          handleConfirm={captureComplete.toggle}
        />
      </StModalWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCLayout;

const StWebRTCContainerWrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const StMediaContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2rem 0rem 2rem 6.5rem;
  box-sizing: border-box;
`;

const StSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StSettingBtnWrapper = styled.div``;

const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;

const StCoretimeInfoWrapper = styled.section`
  width: 100%;

  box-sizing: border-box;
  padding: 2rem 6.5rem 2rem 2rem;
`;

const StChattingWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 33.9rem;
  padding: 1.8rem;
  box-sizing: border-box;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 38.14%,
    rgba(238, 238, 250, 0.03) 128.32%
  );

  & > h3 {
    padding: 0 1rem 1rem 2rem;

    ${({ theme }) => theme.fonts.Title1};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 4rem;

  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.colors.White};

  & > button {
    box-sizing: border-box;
    padding: 0.5rem 1rem;

    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.Learniverse_BG};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInput = styled.input`
  width: 75%;
  padding: 0.7rem 2rem;
  ${({ theme }) => theme.fonts.Body1};
`;

const StCoreTimeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  padding-top: 3rem;
`;

const StStudyroomBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  width: fit-content;
`;

const StExitButton = styled.button`
  padding: 1.2rem 7.6rem;

  border-radius: 100rem;
  background-color: ${({ theme }) => theme.colors.Purple3};
  box-shadow: 2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title2};
`;

const StModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'flex' : 'none')};
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

const StIssueModalWrapper = styled.div<{ $showing: boolean }>`
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
