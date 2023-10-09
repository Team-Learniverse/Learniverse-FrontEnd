import { Dispatch, SetStateAction, useState } from 'react';

import { ChattingInfo, CustomSocket } from '@/types/socket';
import { getTime } from '@/utils/getTime';

type UseChatHandlerReturnType = [
  string,
  Dispatch<SetStateAction<string>>,
  () => void,
];

const useChatHandler = (
  curSocket: CustomSocket,
  curNickname: string,
  addChattingList: (chat: ChattingInfo) => void,
): UseChatHandlerReturnType => {
  const [chatting, setChatting] = useState<string>('');

  const handleSendChatting = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!curSocket || !chatting) {
        reject(new Error('Socket not available or no message provided.'));
        return;
      }

      curSocket.emit('message', chatting);

      const sentChat: ChattingInfo = {
        name: curNickname,
        message: chatting,
        time: getTime(new Date()),
      };
      addChattingList(sentChat);
      setChatting('');
      resolve();
    });
  };

  return [chatting, setChatting, handleSendChatting];
};

export default useChatHandler;
