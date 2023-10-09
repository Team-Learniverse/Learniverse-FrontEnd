import { styled } from 'styled-components';

import { IcChar, IcRoomLogo, IcSend } from '@/public/assets/icons';

interface Props {
  chatName: string;
}

const Side = ({ chatName }: Props) => {
  return (
    <StStudySideWrapper>
      <StRoomNameWrapper>
        <IcRoomLogo />
        <h1>소웨5공주 공부방</h1>
      </StRoomNameWrapper>
      <StMemberListWrapper>
        <p>스터디룸 팀원</p>
        <StMemberList>
          <StMemberWrapper>
            <IcChar />
            <p>코딩천사 선영이</p>
          </StMemberWrapper>
          <StMemberWrapper>
            <IcChar />
            <p>유지니</p>
          </StMemberWrapper>
          <StMemberWrapper>
            <IcChar />
            <p>100지민</p>
          </StMemberWrapper>
          <StMemberWrapper>
            <IcChar />
            <p>효승이</p>
          </StMemberWrapper>
          <StMemberWrapper>
            <IcChar />
            <p>iamphj3</p>
          </StMemberWrapper>
        </StMemberList>
      </StMemberListWrapper>
      <hr />
      <StChatWrapper>
        <p>{chatName}</p>
        <StSendWrapper>
          <IcSend />
        </StSendWrapper>
      </StChatWrapper>
    </StStudySideWrapper>
  );
};

export default Side;

const StStudySideWrapper = styled.section`
  position: relative;

  width: 33%;
  height: calc(100vh - 13.5rem);

  border-radius: 3rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StRoomNameWrapper = styled.div`
  display: flex;
  align-items: center;

  padding-left: 3.1rem;
  padding-top: 2.588rem;

  & > h1 {
    padding-left: 1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 1.5rem;
  padding-bottom: 2rem;

  & > p {
    padding-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StMemberList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  padding-top: 1.2rem;
  padding-left: 3.5rem;
`;

const StMemberWrapper = styled.div`
  display: flex;
  align-items: center;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body2};
  }

  & > p :nth-child(2) {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body4};
  }
`;

const StChatWrapper = styled.div`
  padding-top: 2.3rem;
  width: 100%;

  & > p {
    padding-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StSendWrapper = styled.div`
  width: 100%;
  height: 5rem;

  position: absolute;
  bottom: 0rem;

  background: ${({ theme }) => theme.colors.White};
  border-radius: 0 0 3rem 3rem;

  & > svg {
    position: absolute;
    right: 1.3rem;
    bottom: 1.5rem;
  }
`;
