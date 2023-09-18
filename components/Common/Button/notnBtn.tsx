import { styled } from 'styled-components';

import { IcNotion } from '@/public/assets/icons';

const NotnBtn = () => {
  return (
    <StIconBtnWrapper>
      <IcNotion />
    </StIconBtnWrapper>
  );
};

export default NotnBtn;

const StIconBtnWrapper = styled.button`
  width: 5.5rem;
  height: 5.5rem;
  margin-right: 1.4rem;

  background: ${({ theme }) => theme.colors.LightGray1};

  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25) inset;
  border-radius: 1rem;
`;