/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  useChatHandler,
  useSocketConnection,
  useVideoSelector,
  useWebRTC,
} from '@/hooks/Socket';
import useModal from '@/hooks/useModal';
import { usePushNotification } from '@/hooks/usePushNotification';
import useToggle from '@/hooks/useToggle';
import { memberIdState } from '@/recoil/atom';

import WebRTCLayout from './WebRTCLayout';

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);
  const [curName, setCurName] = useState<string>();
  const [curRoomId, setRoomId] = useState<string>();

  const curSocket = useSocketConnection(curRoomId!);
  const {
    curMembers,
    // curDevice,
    // curProducer,
    // curPeerList,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
    // handleCloseProducer,
  } = useWebRTC(curRoomId!, curName!, curSocket!);

  const [isMedia, handleMedia] = useToggle();
  const [isMike, handleMike] = useToggle();
  const [isSpeaker, handleSpeaker] = useToggle();
  const [selectedVideo, handleSelectVideo] = useVideoSelector();
  const [chatting, setChatting, handleSendChatting] = useChatHandler(
    curSocket!,
    addChattingList,
    name,
  );
  const gallery = useModal();
  const pushNotification = usePushNotification();

  const handleTurnOffMedia = async () => {
    // await handleCloseProducer(producerId);
    handleMedia();
  };

  useEffect(() => {
    if (name && room_id) {
      setCurName(name.toString());
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <WebRTCLayout
      curRoomId={curRoomId!}
      isMedia={isMedia}
      handleMedia={handleTurnOffMedia}
      isMike={isMike}
      handleMike={handleMike}
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
      gallery={gallery}
    />
  );
};

export default WebRTCContainer;
