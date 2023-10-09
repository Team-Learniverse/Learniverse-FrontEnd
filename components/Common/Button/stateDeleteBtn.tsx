import { styled } from 'styled-components';

interface Props {
  btnName: string;
  handleClick: () => void;
}

const StateDeleteBtn = ({ btnName, handleClick }: Props) => {
  return (
    <StStateBtnWrapper onClick={handleClick}>
      <p>{btnName}</p>
    </StStateBtnWrapper>
  );
};

export default StateDeleteBtn;

const StStateBtnWrapper = styled.button`
  width: 6rem;
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.Orange2};

  border-radius: 30rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body4};
  }
`;
