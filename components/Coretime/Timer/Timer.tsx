import React from 'react';
import { styled } from 'styled-components';

import { IcTimer } from '@/public/assets/icons';

import useTime from './useTime';

const Timer: React.FC = () => {
  const { formattedTime } = useTime();
  return (
    <StTimeWrapper>
      <IcTimer />
      <h1>{formattedTime}</h1>
    </StTimeWrapper>
  );
};

export default Timer;

const StTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: fit-content;

  & > h1 {
    padding-left: 1.4rem;

    color: ${({ theme }) => theme.colors.Orange2};
    ${({ theme }) => theme.fonts.Head0};
  }

  & > svg {
    width: 4.4rem;
  }
`;
