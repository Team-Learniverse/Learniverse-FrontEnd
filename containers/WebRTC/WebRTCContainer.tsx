/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getCoreEndtime } from '@/apis/coretimes';
import { useFCMPushAlarm } from '@/hooks/FCM';
import {
  useChatHandler,
  useSocketConnection,
  useVideoSelector,
  useWebRTC,
} from '@/hooks/Socket';
import useModal from '@/hooks/useModal';
import useToggle from '@/hooks/useToggle';
import { captureTimeState, memberIdState } from '@/recoil/atom';
import { getNickName } from '@/utils/getNicknames';

import WebRTCLayout from './WebRTCLayout';

const WebRTCContainer = () => {
  // 전역 상태 (coreTimeId, memberId, 캡처 시간)
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);

  // 푸시 알림 받기
  useFCMPushAlarm();
  const captureTime = useRecoilValue(captureTimeState);

  // 현재 코어타임, 사용자 관련 상태
  const [curName, setCurName] = useState<string>();
  const [curNickname, setCurNickname] = useState('');
  const [curRoomId, setRoomId] = useState<string>();
  const [curCoreEndTime, setCurCoreEndTime] = useState<Date>();

  // 소켓 관련 상태
  const curSocket = useSocketConnection(curRoomId!);
  const {
    produce,
    curMembers,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
    handleCloseProducer,
    handleExitRoom,
  } = useWebRTC(curRoomId!, curName!, curSocket!);
  const [chatting, setChatting, handleSendChatting] = useChatHandler(
    curSocket!,
    curNickname!,
    addChattingList,
  );

  // 토글 버튼
  const [isMedia, handleMedia] = useToggle();
  const [isMike, handleMike] = useToggle();
  const [isSpeaker, handleSpeaker] = useToggle();
  const [selectedVideo, handleSelectVideo] = useVideoSelector();

  const coreIssue = useModal();

  const setCoreEndTime = async () => {
    const coreEndTime = await getCoreEndtime(Number(curRoomId));
    setCurCoreEndTime(coreEndTime);
  };

  const setNickname = async () => {
    const nickname = await getNickName(curName!);
    setCurNickname(nickname);
  };

  const handleTurnOff = async (type: string) => {
    const medias = type === 'video' ? videoStreams : audioStreams;
    const foundPeer = medias.find((media) => media.name === curName);
    if (foundPeer) {
      await handleCloseProducer(foundPeer.consumer_id);
    } else {
      console.error('No match found');
    }
  };

  const handleMediaToggle = async () => {
    if (isMedia) {
      await handleTurnOff('video');
    } else {
      await produce('screenType');
    }
    handleMedia();
  };

  const handleMikeToggle = async () => {
    if (isMike) {
      await handleTurnOff('audio');
    } else {
      await produce('audioType');
    }
    handleMike();
  };

  useEffect(() => {
    if (name && room_id) {
      setCurName(name.toString());
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (curName) {
      setNickname();
    }
  }, [curName]);

  useEffect(() => {
    if (curRoomId) {
      setCoreEndTime();
    }
  }, [curRoomId]);

  return (
    <WebRTCLayout
      captureTime={captureTime}
      coreEndTime={curCoreEndTime!}
      curNickname={curNickname!}
      curRoomId={curRoomId!}
      curMemberId={curName!}
      isMedia={isMedia}
      handleMedia={handleMediaToggle}
      isMike={isMike}
      handleMike={handleMikeToggle}
      isSpeaker={isSpeaker}
      handleSpeaker={handleSpeaker}
      selectedVideo={selectedVideo}
      chatting={chatting}
      setChatting={setChatting}
      curMembers={curMembers}
      videoStreams={videoStreams}
      audioStreams={audioStreams}
      handleSelectVideo={handleSelectVideo}
      chattingList={chattingList}
      handleSendChatting={handleSendChatting}
      handleExitRoom={handleExitRoom}
      issue={coreIssue}
    />
  );
};

export default WebRTCContainer;
