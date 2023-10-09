import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { CustomSocket } from '@/types/socket';

const useSocketConnection = (curRoomId: string) => {
  const [socket, setSocket] = useState<CustomSocket | null>(null);

  const socketPromise = (curSocket: typeof Socket) => {
    return function request(type: string, data = {}) {
      return new Promise((resolve) => {
        curSocket.emit(type, data, resolve);
      });
    };
  };

  const connect = async () => {
    if (!curRoomId) return;
    const socketConnection: CustomSocket = await io(
      process.env.NEXT_PUBLIC_MEDIA_IP!,
      {
        transports: ['websocket', 'polling', 'flashsocket'],
        secure: true,
      },
    );
    socketConnection.request = await socketPromise(socketConnection);
    setSocket(socketConnection);
    console.log('1. socket connect', socketConnection);
  };

  useEffect(() => {
    connect();
  }, [curRoomId]);

  return socket;
};

export default useSocketConnection;
