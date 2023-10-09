/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Device } from 'mediasoup-client';
import {
  Consumer,
  RtpCapabilities,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { fcmTokenState } from '@/recoil/atom';
import {
  ChattingInfo,
  ConsumeInfo,
  ConsumerId,
  ConsumerInfo,
  CustomSocket,
  JoinInfo,
  MediaType,
  PeersInfo,
  RoomInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { addNickNameToPeer, getNickName } from '../../utils/getNicknames';
import {
  handleConnectError,
  handleConsumerClosed,
  handleMessage,
  handleNewProducers,
} from './socketHandlers';

const useWebRTC = (
  curRoomId: string,
  curName: string,
  socket: CustomSocket,
) => {
  const router = useRouter();
  const fcmToken = useRecoilValue(fcmTokenState);

  const [curMembers, setCurMembers] = useState<RoomPeerInfo[]>([]);
  const [curDevice, setCurDevice] = useState<Device>();
  const [curPeerList, setCurPeerList] = useState<PeersInfo[]>([]);
  const [isDeviceLoaded, setIsDeviceLoaded] = useState(false);

  const [videoStreams, setVideoStreams] = useState<ConsumeInfo[]>([]);
  const [audioStreams, setAudioStreams] = useState<ConsumeInfo[]>([]);
  const [chattingList, setChattingList] = useState<ChattingInfo[]>([]);

  const createRoom = async (roomId: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        room_id: roomId,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
    console.log('1-1. createRoom');
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let device;
    try {
      device = new Device();
      await device.load({ routerRtpCapabilities });
      setCurDevice(device);
      setIsDeviceLoaded(true);
      console.log('3. device 로딩 ', device);
    } catch (error) {
      if (error instanceof UnsupportedError) {
        console.error('Browser not supported');
      } else {
        console.error(error);
      }
      return null;
    }
    return device;
  };

  const join = async (roomId: string, nickName: string) => {
    if (!socket || !socket.request) return;
    try {
      const socketJoin: JoinInfo = await socket.request('join', {
        room_id: roomId,
        name: nickName,
      });
      console.log('2. Joined to room', socketJoin);

      await socket.request('setCaptureAlert', {
        memberId: curName,
        roomId: 1,
        coreTimeId: curRoomId,
        token: fcmToken,
      });

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);

      if (curDevice) {
        socket.emit('getProducers');
      }
    } catch (err) {
      console.error('Join error:', err);
    }
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

  const initSockets = async () => {
    if (!socket || !socket.request) return;

    await produce('screenType');
    await produce('audioType');

    const peerList: RoomInfo = await socket.request('getRoomInfo');
    console.log('4-1. peerList', peerList);
    setCurPeerList(peerList.peers);
    const formatData = peerList.peers.slice(0, -2);
    await consumeProducers(formatData);

    const peers: RoomPeerInfo[] = await socket.request('getRoomPeerInfo');
    console.log('4-1. getRoomPeerInfo', peers);
    const peersWithNickNames = await Promise.all(
      peers.map((peer) => addNickNameToPeer(peer)),
    );
    setCurMembers(peersWithNickNames);
  };

  const consumeProducers = async (producers: PeersInfo[]) => {
    if (!socket || !socket.request) return;

    if (!curDevice) {
      const data = await socket.request('getRouterRtpCapabilities');
      const device = await loadDevice(data);
      setCurDevice(device!);
      await consumeWithDevice(device!, producers);
    } else {
      await consumeWithDevice(curDevice, producers);
    }
  };

  const consumeWithDevice = async (device: Device, producers: PeersInfo[]) => {
    const consumePromises = producers.map((producer) => {
      const { producer_id, producer_user_name, producer_type } = producer;
      return consume(
        device,
        producer_id,
        producer_user_name,
        producer_type,
      ).catch((error) =>
        console.error(`Error while consuming producer ${producer_id}:`, error),
      );
    });
    await Promise.all(consumePromises);
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
    nickname: string,
    name: string,
    consumerId: string,
    type: string,
  ) => {
    const curStream: ConsumeInfo = {
      nickname,
      name,
      consumer_id: consumerId,
      stream: newStream,
    };
    if (type === 'video')
      setVideoStreams((prevStreams) => [...prevStreams, curStream]);
    if (type === 'audio')
      setAudioStreams((prevStreams) => [...prevStreams, curStream]);
  };

  const removeStream = (consumer_id: string) => {
    setVideoStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.consumer_id !== consumer_id),
    );
    setAudioStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.consumer_id !== consumer_id),
    );
  };

  const produce = async (type: MediaType): Promise<void> => {
    if (!curDevice || !socket || !socket.request) return;

    try {
      const nickname = await getNickName(curName!);
      const stream = await getMediaStream(type);
      if (!stream) return;

      const track = getTrack(stream, type);
      const producerTransport = await createTransport(curDevice, 'produce');
      const producer = await producerTransport.produce({ track });

      addStream(
        stream,
        nickname,
        curName,
        producer.id,
        type === 'screenType' ? 'video' : 'audio',
      );
    } catch (error) {
      console.error(`Error producing ${type}:`, error);
    }
  };

  const getMediaStream = async (
    type: MediaType,
  ): Promise<MediaStream | null> => {
    try {
      if (type === 'screenType') {
        return await navigator.mediaDevices.getDisplayMedia({ video: true });
      }
      if (type === 'audioType') {
        return await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${type} media stream:`, error);
      return null;
    }
  };

  const getTrack = (stream: MediaStream, type: MediaType) => {
    if (type === 'screenType') {
      return stream.getVideoTracks()[0];
    }
    if (type === 'audioType') {
      return stream.getAudioTracks()[0];
    }
    throw new Error(`Unknown media type: ${type}`);
  };

  const consume = async (
    device: Device,
    curProducerId: string,
    curProducerName: string,
    produceType: string,
  ): Promise<void> => {
    try {
      if (!socket || !socket.request) return;
      const consumerTransport = await createTransport(device, 'consume');
      const { rtpCapabilities } = device;

      const data = await socket.request('consume', {
        consumerTransportId: consumerTransport.id,
        producerId: curProducerId,
        producerName: curProducerName,
        rtpCapabilities,
      });

      const {
        producerId,
        producerName,
        id,
        kind,
        rtpParameters,
      }: ConsumerInfo = data;

      const consumer: Consumer = await consumerTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
      });

      const stream = new MediaStream();
      stream.addTrack(consumer.track);

      const nickname = await getNickName(producerName);
      addStream(
        new MediaStream([consumer.track]),
        nickname,
        producerName,
        id,
        produceType,
      );
    } catch (error) {
      console.error('Error consuming:', error);
    }
  };

  const addChattingList = (chat: ChattingInfo) => {
    setChattingList((prev) => [...prev, chat]);
  };

  const handleCloseProducer = async (producerId: string) => {
    console.log('Closing Producer : ', producerId);
    removeStream(producerId);
    await socket.emit('producerClosed', {
      producer_id: producerId,
    });
  };

  const handleExitRoom = async () => {
    if (!socket.request) return;
    const data = await socket.request('exitRoom');
    console.log(data);
    router.back();
  };

  useEffect(() => {
    if (socket && socket.request) {
      socket.on('connect_error', handleConnectError);
      socket.on('newProducers', async (data: PeersInfo[]) => {
        handleNewProducers(data, consumeProducers, setCurMembers);
      });
      socket.on('message', async (data: ChattingInfo) => {
        handleMessage(data, setChattingList);
      });
      socket.on('consumerClosed', (data: ConsumerId) =>
        handleConsumerClosed(data, removeStream),
      );
      socket.on('disconnect', async () => {
        if (socket.request) {
          const data = await socket.request('removeCaptureAlert', {
            memberId: curName,
          });
          console.log(data);
          router.push('/home');
        }
      });
    }
    return () => {
      if (socket) {
        socket.off('connect_error', handleConnectError);
        socket.off('newProducers');
        socket.off('message');
        socket.off('consumerClosed');
        socket.off('disconnect');
      }
    };
  }, [socket]);

  useEffect(() => {
    enterRoom();
    initSockets();
  }, [socket, curRoomId, curName]);

  useEffect(() => {
    initSockets();
  }, [isDeviceLoaded]);

  return {
    produce,
    curMembers,
    curDevice,
    curPeerList,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
    handleCloseProducer,
    handleExitRoom,
  };
};

export default useWebRTC;
