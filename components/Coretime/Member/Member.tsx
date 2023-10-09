import { styled } from 'styled-components';

import { IcChar } from '@/public/assets/icons';
import { RoomPeerInfo } from '@/types/socket';

interface MembersProps {
  curMembers: RoomPeerInfo[];
}

const Member = ({ curMembers }: MembersProps) => (
  <StMemberWrapper>
    <h3>현재 접속 중</h3>
    <StMembers>
      {curMembers.map((member) => (
        <StMember key={member.id}>
          <IcChar />
          <span>{member.nickname}</span>
        </StMember>
      ))}
    </StMembers>
  </StMemberWrapper>
);

export default Member;

const StMemberWrapper = styled.div`
  position: relative;

  width: 100%;
  height: fit-content;
  padding: 1.8rem;
  margin-bottom: 2.4rem;
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

const StMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;

  padding: 1rem 1rem 0 1rem;
`;

const StMember = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > span {
    ${({ theme }) => theme.fonts.Title5};
    color: ${({ theme }) => theme.colors.White};
  }
`;
