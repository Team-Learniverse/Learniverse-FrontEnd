import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { IcLoginBtn } from "@/public/assets/icons";
import { memberIdState } from "@/recoil/atom";

const Landing = () => {
  const router = useRouter();
  const [curMemberId, setCurMemberId] = useRecoilState(memberIdState);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const handleLoginClick = async () => {
    setShowInput(true);
    // const data = await getLogin();
    // console.log(data);
    // window.location.href = `https://learniverse-main.kro.kr/oauth2/authorization/github`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurMemberId(e.target.value as unknown as number);
  };

  const handleInputClick = () => {
    if (curMemberId) {
      router.push('/home');
    }
  };

  return (
    <StLandingWrapper>
      <h1>LearniVerse</h1>
      {showInput && (
        <StInputWrapper>
          <StMemberIdInput
            ref={inputRef}
            value={curMemberId}
            onChange={handleInputChange}
            placeholder="Enter memberId"
          />
          <StEnterBtn type="button" onClick={handleInputClick}>
            Go
          </StEnterBtn>
        </StInputWrapper>
      )}
      <StLoginBtn type="button" onClick={handleLoginClick}>
        <IcLoginBtn />
      </StLoginBtn>
    </StLandingWrapper>
  );
};

export default Landing;

const StLandingWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100%;
  height: 100vh;

  background-color: #0f173b;
  background: url('https://user-images.githubusercontent.com/73213437/264514735-92fc6e5a-7a3a-4841-a9fa-b97d778b2633.svg')
    center/cover no-repeat;

  & > h1 {
    margin-bottom: 4rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};
    font-size: 8rem;
  }
`;

const StLoginBtn = styled.button``;

const StInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const StMemberIdInput = styled.input`
  width: 23rem;
  height: 5rem;
  margin-bottom: 3rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title3};
  text-align: center;
`;

const StEnterBtn = styled.button`
  width: 5rem;
  height: 5rem;
  margin-bottom: 3rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Title3};
`;
