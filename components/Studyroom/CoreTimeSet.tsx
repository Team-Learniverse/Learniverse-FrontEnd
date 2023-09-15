import { styled } from 'styled-components';

import { StateBtn } from '../Common/Button';

const CoreTimeSet = () => {
  return (
    <StCoretimeWrapper>
      <h1>코어타임</h1>
      <StCoretableWrapper>
        <div>
          <p>8월 27일</p>
          <p>17:00 - 19:00</p>
          <StateBtn btnName="진행중" />
        </div>
        <hr />
        <div>
          <p>9월 7일</p>
          <p>13:00 - 19:00</p>
          <StateBtn btnName="삭제" />
        </div>
        <hr />
      </StCoretableWrapper>
    </StCoretimeWrapper>
  );
};

export default CoreTimeSet;

const StCoretimeWrapper = styled.div`
  margin-top: 2.3rem;
  margin-bottom: 3.1rem;

  display: flex;
  flex-direction: column;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StCoretableWrapper = styled.div`
  width: 100%;
  height: 11rem;

  margin-top: 2.3rem;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.LightGray2};
  border-radius: 1.2rem;

  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin-top: 0.6rem;
    margin-bottom: 0.6rem;

    & > p {
      color: ${({ theme }) => theme.colors.Learniverse_BG};
      ${({ theme }) => theme.fonts.Title5};
    }
  }
  & > hr {
    border-color: ${({ theme }) => theme.colors.Gray3};
  }
`;
