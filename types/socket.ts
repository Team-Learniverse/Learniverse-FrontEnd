/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io-client';

type SocketType = typeof Socket;

export type MediaType = 'audioType' | 'videoType' | 'screenType';

export interface ProducerList {
  producer_id: string;
  producer_socket_id: string;
}

// interface CustomSocket extends Socket<DefaultEventsMap, DefaultEventsMap> {
//   prototype: any; // 또는 필요한 타입으로 대체
// }

export interface CustomSocket extends SocketType {
  request?: (event: string, data?: any) => Promise<any>;
}

export interface ChattingInfo {
  name: string;
  message: string;
  time: string;
}
