import { styled } from 'styled-components';

import { IcMike, IcMikeOff } from '@/public/assets/icons';

import { StMediaBtn } from './MediaBtn';

interface MikeBtnProps {
  handleMike: () => void;
  isMike: boolean;
}

const MikeBtn = ({ handleMike, isMike }: MikeBtnProps) => (
  <StMikeBtn type="button" onClick={handleMike}>
    {isMike ? <IcMike /> : <IcMikeOff />}
  </StMikeBtn>
);

const StMikeBtn = styled(StMediaBtn)``;

export default MikeBtn;
