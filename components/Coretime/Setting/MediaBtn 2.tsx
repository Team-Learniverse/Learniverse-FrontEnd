import { styled } from 'styled-components';

import { IcMedia, IcMediaOff } from '@/public/assets/icons';

interface MediaBtnProps {
  handleMedia: () => void;
  isMedia: boolean;
}

const MediaBtn = ({ handleMedia, isMedia }: MediaBtnProps) => (
  <StMediaBtn type="button" onClick={handleMedia}>
    {isMedia ? <IcMedia /> : <IcMediaOff />}
  </StMediaBtn>
);

export const StMediaBtn = styled.button`
  padding: 0.6rem 0;
  margin-right: 0.8rem;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body0};
`;

export default MediaBtn;
