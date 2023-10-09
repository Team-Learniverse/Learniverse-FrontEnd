import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { ChattingInfo } from '@/types/socket';

interface ChattingsProps {
  curNickname: string;
  chattingList: ChattingInfo[];
}

const Chatting = ({ curNickname, chattingList }: ChattingsProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chattingList]);

  return (
    <>
      <h3>코어타임 채팅</h3>
      <StChattings ref={chatRef}>
        {chattingList.map((chattings) => (
          <StChatting
            key={`${chattings.name}-${chattings.message}-${chattings.time}`}
            $iscurrentUser={curNickname === chattings.name}
          >
            <span>{chattings.name}</span>
            <p>{chattings.message}</p>
            <time>{chattings.time}</time>
          </StChatting>
        ))}
      </StChattings>
    </>
  );
};

export default Chatting;

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

const StChatting = styled.div<{ $iscurrentUser?: boolean }>`
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
    color: ${({ theme, $iscurrentUser }) =>
      $iscurrentUser ? theme.colors.Blue : theme.colors.SkyBlue};
  }
  & > p {
    ${({ theme }) => theme.fonts.Body4};
  }
  & > time {
    ${({ theme }) => theme.fonts.Body8};
    color: ${({ theme }) => theme.colors.Gray2};
  }
`;
