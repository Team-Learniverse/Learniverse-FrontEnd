import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { memberIdState } from "@/recoil/atom";

interface HeaderModalProps {
  isShowing: boolean;
  // handleHide: React.MouseEventHandler;
}

const HeaderModal = ({ isShowing }: HeaderModalProps) => {
  const router = useRouter();
  const setMemberId = useSetRecoilState(memberIdState);

  const handleProfile = () => {
    console.log('프로필 설정 : 1차 데모 이후 구현');
  };
  const handleLogout = () => {
    setMemberId(1);
    router.push('/');
  };

  return (
    isShowing && (
      <StHeaderModalWrapper>
        <button type="button" onClick={handleProfile}>
          프로필 설정
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            router.push('/mypage');
          }}
        >
          마이페이지
        </button>
        <hr />
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </StHeaderModalWrapper>
    )
  );
};

export default HeaderModal;

const StHeaderModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;

  width: 10rem;
  height: fit-content;
  padding: 0.6rem;
  box-sizing: border-box;

  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.Purple1};

  & > button {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body2};
  }
  & > button:hover {
    color: ${({ theme }) => theme.colors.SkyBlue};
  }
`;
