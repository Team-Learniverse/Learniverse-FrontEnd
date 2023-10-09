import { styled } from 'styled-components';

import { IcGallery, IcIssue } from '@/public/assets/icons';

interface StudyroomBtnProps {
  name: string;
  handleClick: () => void;
}

const StudyroomBtn = ({ name, handleClick }: StudyroomBtnProps) => {
  return (
    <StStudyroomBtn onClick={handleClick}>
      {name === 'issue' ? <IcIssue /> : <IcGallery />}
    </StStudyroomBtn>
  );
};

export default StudyroomBtn;

const StStudyroomBtn = styled.button``;
