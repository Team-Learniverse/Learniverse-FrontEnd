import { styled } from 'styled-components';

import { IcSpeaker, IcSpeakerOff } from '@/public/assets/icons';

import { StMediaBtn } from './MediaBtn';

interface SpeakerBtnProps {
  handleSpeaker: () => void;
  isSpeaker: boolean;
}

const SpeakerBtn = ({ handleSpeaker, isSpeaker }: SpeakerBtnProps) => (
  <StSpeakerBtn type="button" onClick={handleSpeaker}>
    {isSpeaker ? <IcSpeaker /> : <IcSpeakerOff />}
  </StSpeakerBtn>
);

const StSpeakerBtn = styled(StMediaBtn)``;

export default SpeakerBtn;
