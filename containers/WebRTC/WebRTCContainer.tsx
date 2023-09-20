/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Device } from 'mediasoup-client';
import {
  Consumer,
  Producer,
  RtpCapabilities,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import io from 'socket.io-client';
import { styled } from 'styled-components';

import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import usePushNotification from '@/hooks/usePushNotification';
import {
  IcMedia,
  IcMediaOff,
  IcMike,
  IcMikeOff,
  IcSpeaker,
  IcSpeakerOff,
} from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import {
  ChattingInfo,
  ConsumeInfo,
  ConsumerId,
  CustomSocket,
  JoinInfo,
  MediaType,
  ProducerList,
} from '@/types/socket';
import { getTime } from '@/utils/getTime';

import socketPromise from './socketPromise';
import WebRTCAudio from './WebRTCAudio';
import WebRTCVideo from './WebRTCVideo';

const MEDIA_SERVER_URL = process.env.NEXT_PUBLIC_MEDIA_IP;

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);
  const [curName, setCurName] = useState<string>();
  const [curRoomId, setRoomId] = useState<string>();
  const pushNotification = usePushNotification();

  const [device, setDevice] = useState<Device>();
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const [curProducer, setCurProducer] = useState<Producer>();
  // const [curMembers, setCurMembers] = useState<string[]>([]);
  const [videoStreams, setVideoStreams] = useState<ConsumeInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [audioStreams, setAudioStreams] = useState<ConsumeInfo[]>([]);
  const [chatting, setChatting] = useState<string>('');
  const [chattingList, setChattingList] = useState<ChattingInfo[]>([]);

  const [isMedia, setIsMedia] = useState(true);
  const [isMike, setIsMike] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);

  const consumeProducers = async (producers: ProducerList[]) => {
    const consumePromises = producers.map((producer) => {
      const { producer_id, produce_type } = producer;
      return consume(producer_id, produce_type).catch((error) =>
        console.error(`Error while consuming producer ${producer_id}:`, error),
      );
    });
    await Promise.all(consumePromises);
  };

  const enterRoom = async () => {
    if (!socket || !curRoomId || !curName) return;
    try {
      await createRoom(curRoomId);
      await join(curRoomId, curName);
    } catch (error) {
      console.error('Error in creating or joining the room:', error);
    }
  };

  const connect = async () => {
    if (!curName || !curRoomId) return;
    const socketConnection: CustomSocket = await io(MEDIA_SERVER_URL!, {
      transports: ['websocket', 'polling', 'flashsocket'],
      secure: true,
    });
    socketConnection.request = await socketPromise(socketConnection);
    setSocket(socketConnection);
    console.log('1. socket connect', socketConnection);
  };

  const createRoom = async (room_id: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        room_id,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
    console.log('1-1. createRoom');
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let curDevice;
    try {
      curDevice = new Device();
      await curDevice.load({ routerRtpCapabilities });
      setDevice(curDevice);
      console.log('3. device 로딩 ', curDevice);
    } catch (error) {
      if (error instanceof UnsupportedError) {
        console.error('Browser not supported');
      } else {
        console.error(error);
      }
      return null;
    }
    return curDevice;
  };

  const join = async (room_id: string, name: string) => {
    if (!socket || !socket.request) return;
    try {
      const socketJoin: JoinInfo = await socket.request('join', {
        room_id,
        name,
      });
      console.log('2. Joined to room', socketJoin);

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);

      if (device) {
        socket.emit('getProducers');
      }
    } catch (err) {
      console.log('Join error:', err);
    }
  };

  const initSockets = async () => {
    if (!socket || !curName) return;

    await produce('screenType', curName);
    await produce('audioType', curName);
    socket.emit('getOriginProducers');

    socket.on('connect_error', (error: any) => {
      console.log('socket connection error:', error.message);
    });
    socket.on('existedProducers', async (data: ProducerList[]) => {
      console.log('4-1. existedProducers (consumeList)', data);
      const formatData = data.slice(0, -2);
      await consumeProducers(formatData);
    });
    socket.on('newProducers', async (data: ProducerList[]) => {
      console.log('4. New producers (consumeList)', data);
      await consumeProducers(data);
    });
    socket.on('message', (data: ChattingInfo) => {
      setChattingList((prev) => [...prev, data]);
      console.log('New message:', data);
    });
    socket.on('consumerClosed', (data: ConsumerId) => {
      console.log('Closing consumer:', data.consumer_id);
      removeStream(data.consumer_id);
    });
    socket.on('disconnect', () => {
      router.push('/webrtcroom');
    });
  };

  const createTransport = async (
    device: Device,
    direction: 'produce' | 'consume',
  ): Promise<Transport> => {
    if (!socket || !socket.request) throw new Error('Socket not initialized');

    const data = await socket.request('createWebRtcTransport', {
      forceTcp: false,
      rtpCapabilities:
        direction === 'produce' ? device.rtpCapabilities : undefined,
    });
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    const transport =
      direction === 'produce'
        ? device.createSendTransport(data)
        : device.createRecvTransport(data);

    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        if (!socket.request) return;
        await socket.request('connectTransport', {
          transport_id: transport.id,
          dtlsParameters,
        });
        callback();
      } catch (err) {
        errback(err as Error);
      }
    });
    transport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connected':
          console.log(`${direction} transport connected`);
          break;
        case 'failed':
          console.log(`${direction} transport Error`);
          // transport.close();
          break;
        default:
          break;
      }
    });
    if (direction === 'produce') {
      transport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            if (!socket.request) return;
            const producerId = await socket.request('produce', {
              producerTransportId: transport.id,
              kind,
              rtpParameters,
            });
            callback({ id: producerId.producer_id });
            console.log(producerId.producer_id);
            setCurProducer(producerId.producer_id);
          } catch (err) {
            errback(err as Error);
          }
        },
      );
    }
    return transport;
  };

  const addStream = (
    newStream: MediaStream,
    producerId: string,
    type: string,
  ) => {
    const curStream: ConsumeInfo = {
      producer_id: producerId,
      stream: newStream,
    };
    switch (type) {
      case 'video':
        setVideoStreams((prevStreams) => [...prevStreams, curStream]);
        break;
      case 'audio':
        setAudioStreams((prevStreams) => [...prevStreams, curStream]);
        break;
      default:
        break;
    }
    console.log(curStream, videoStreams, audioStreams);
  };

  useEffect(() => {
    console.log('Updated videoStreams:', videoStreams);
  }, [videoStreams]);

  useEffect(() => {
    console.log('Updated audioStreams:', audioStreams);
  }, [audioStreams]);

  const produce = async (type: MediaType, memberId: string): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      let stream: MediaStream;
      if (type === 'screenType') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        addStream(stream, socket.id, 'video');
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        addStream(stream, socket.id, 'audio');
      }

      const track =
        type === 'audioType'
          ? stream.getAudioTracks()[0]
          : stream.getVideoTracks()[0];
      console.log(track);

      const producerTransport = await createTransport(device, 'produce');

      const producer = await producerTransport.produce({ track });

      producer.on('trackended', () => {
        closeProducer();
        console.log('Track ended');
      });

      console.log(`Producing ${type} for member: ${memberId}`);
    } catch (error) {
      console.error(`Error producing ${type}:`, error);
    }
  };

  const consume = async (
    producerId: string,
    produceType: string,
  ): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      const consumerTransport = await createTransport(device, 'consume');
      const { rtpCapabilities } = device;

      const data = await socket.request('consume', {
        producerId,
        consumerTransportId: consumerTransport.id,
        rtpCapabilities,
      });
      const { id, kind, rtpParameters } = data;

      const consumer: Consumer = await consumerTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
      });

      const stream = new MediaStream();
      stream.addTrack(consumer.track);
      // console.log(consumer.track.muted);

      // consumer.on('transportclose', () => {
      //   console.log('Consumer transport closed');
      // });
      console.log(`Consumed media from producerId: ${producerId}`);
      addStream(new MediaStream([consumer.track]), producerId, produceType);
    } catch (error) {
      console.error('Error consuming:', error);
    }
  };

  const closeProducer = () => {
    if (curProducer) {
      curProducer.close();
      setCurProducer(undefined);
    }
  };

  const removeStream = (producer_id: string) => {
    console.log(producer_id, audioStreams, videoStreams);

    // const filteredAudioStreams: ConsumeInfo[] = audioStreams.filter(
    //   (stream) => stream.producer_id !== producer_id,
    // );
    // const filteredVideoStreams: ConsumeInfo[] = videoStreams.filter(
    //   (stream) => stream.producer_id !== producer_id,
    // );

    // setAudioStreams(filteredAudioStreams);
    // setVideoStreams(filteredVideoStreams);
  };

  const handleSendChatting = () => {
    if (!socket) return;
    socket.emit('message', chatting);

    const sentChat: ChattingInfo = {
      name: name.toString(),
      message: chatting,
      time: getTime(new Date()),
    };

    setChattingList((prev) => [...prev, sentChat]);
    setChatting('');
  };

  const handleMedia = () => {
    setIsMedia((prevState) => !prevState);
    // if (!socket) return;
    // socket.emit('producerClosed', curProducer);
  };

  const handleMike = async () => {
    setIsMike((prevState) => !prevState);
  };

  const handleSpeaker = async () => {
    setIsSpeaker((prevState) => !prevState);
  };

  useEffect(() => {
    if (name && room_id) {
      console.log('name:', name, 'room_id:', room_id);
      setCurName(name as unknown as string);
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (curRoomId) {
      connect();
    }
  }, [curRoomId]);

  useEffect(() => {
    enterRoom();
  }, [socket, curRoomId, curName]);

  useEffect(() => {
    initSockets();
  }, [device]);

  useEffect(() => {
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  });

  return (
    <StWebRTCContainerWrapper>
      <StMediaContainer>
        <StSettingWrapper>
          <TimeProvider>
            <Timer />
          </TimeProvider>
          <StSettings>
            <button type="button" onClick={handleMedia}>
              {isMedia ? <IcMedia /> : <IcMediaOff />}
            </button>
            <button type="button" onClick={handleMike}>
              {isMike ? <IcMike /> : <IcMikeOff />}
            </button>
            <button type="button" onClick={handleSpeaker}>
              {isSpeaker ? <IcSpeaker /> : <IcSpeakerOff />}
            </button>
          </StSettings>
        </StSettingWrapper>
        <StMediaWrapper>
          {videoStreams.map((stream) => (
            <WebRTCVideo
              roomId={curRoomId!}
              memberId={curName!}
              key={stream.producer_id}
              mediaStream={stream.stream}
              isSelected={selectedVideo === stream.producer_id}
              onClick={() =>
                setSelectedVideo(
                  selectedVideo === stream.producer_id
                    ? null
                    : stream.producer_id,
                )
              }
            />
          ))}
          {audioStreams.map((stream) => (
            <WebRTCAudio
              key={stream.producer_id}
              mediaStream={stream.stream}
              ismuted={!isSpeaker}
            />
          ))}
        </StMediaWrapper>
      </StMediaContainer>
      <StCoretimeInfoWrapper>
        <StChattingWrapper>
          <h3>코어타임 채팅</h3>
          <StChattings>
            {chattingList.map((chattings, index) => (
              <StChatting key={index}>
                <span>{chattings.name}</span>
                <p>{chattings.message}</p>
                <time>{chattings.time}</time>
              </StChatting>
            ))}
          </StChattings>
          <StChatInputWrapper>
            <StChatInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chatting || ''}
              onChange={(e) => setChatting(e.target.value)}
            />
            <button type="button" onClick={handleSendChatting}>
              전송
            </button>
          </StChatInputWrapper>
        </StChattingWrapper>
      </StCoretimeInfoWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

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
const StSettings = styled.section`
  display: flex;
  gap: 0.8rem;

  & > button {
    padding: 1.8rem 0 0.7rem 0;
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;

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

const StChattings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  height: 80%;
  overflow-y: scroll;

  border-radius: 1rem;

  & > :last-child {
    margin-bottom: 2rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StChatting = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr 1fr;

  width: 100%;
  height: fit-content;
  padding: 1rem;
  box-sizing: border-box;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};

  & > span {
    ${({ theme }) => theme.fonts.Body4};
    color: ${({ theme }) => theme.colors.SkyBlue};
  }
  & > p {
    ${({ theme }) => theme.fonts.Body4};
  }
  & > time {
    ${({ theme }) => theme.fonts.Body8};
    color: ${({ theme }) => theme.colors.Gray2};
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
