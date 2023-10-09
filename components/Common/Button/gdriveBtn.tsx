import { styled } from 'styled-components';

import { IcGDrive } from '@/public/assets/icons';

interface Props {
  handleClick: (key: number) => void;
}

const GdriveBtn = ({ handleClick }: Props) => {
  return (
    <StIconBtnWrapper>
      <IcGDrive onClick={handleClick} />
    </StIconBtnWrapper>
  );
};

export default GdriveBtn;

const StIconBtnWrapper = styled.button`
  width: 5.5rem;
  height: 5.5rem;
  margin-right: 1.4rem;

  background: ${({ theme }) => theme.colors.LightGray1};

  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25) inset;
  border-radius: 1rem;
`;
