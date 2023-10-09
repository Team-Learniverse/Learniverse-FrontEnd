import { styled } from 'styled-components';

interface Props {
  btnName: string;
}

const stateBtn = ({ btnName }: Props) => {
  return (
    <StStateBtnWrapper>
      <p>{btnName}</p>
    </StStateBtnWrapper>
  );
};

export default stateBtn;

const StStateBtnWrapper = styled.button`
  width: 6rem;
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.Green};

  border-radius: 30rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body4};
  }
`;
