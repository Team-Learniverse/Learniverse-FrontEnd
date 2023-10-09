import { styled } from 'styled-components';

interface Props {
  btnName: string;
  handleClick: () => void;
}

const CoreBtn = ({ btnName, handleClick }: Props) => {
  return (
    <StCoreBtnWrapper type="button" onClick={handleClick}>
      <p>{btnName}</p>
    </StCoreBtnWrapper>
  );
};

export default CoreBtn;

const StCoreBtnWrapper = styled.button`
  width: 100%;
  height: 5.6rem;

  border-radius: 2.5rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title2};
  }

  background: ${({ theme }) => theme.colors.Purple3};
  box-shadow:
    2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;
`;
