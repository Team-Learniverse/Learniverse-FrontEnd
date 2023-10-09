import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { postNotice } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { PostNoticeInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const CreateNoticeModal = ({ isShowing, handleCancel }: Props) => {
  const [ntitle, setNTitle] = useState('');
  const [ncontent, setNContent] = useState('');
  const [noticeData, setNoticeData] = useState<PostNoticeInfo>();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const roomID = useRecoilValue(roomIdState);
  const memberID = useRecoilValue(memberIdState);

  const handleInputHeight = () => {
    if (inputRef && inputRef.current && inputRef.current.scrollHeight < 10) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}rem`;
    }
  };

  const handleNotice = async () => {
    await postNotice(noticeData!);
  };

  const initData = () => {
    setNTitle('');
    setNContent('');
  };

  useEffect(() => {
    setNoticeData({
      memberId: memberID,
      roomId: roomID,
      title: ntitle,
      content: ncontent,
    });
  }, [ntitle, ncontent]);

  return (
    isShowing && (
      <LargeModal title="스터디룸 공지 작성하기" isShowing={isShowing}>
        <StNoticeModalWrapper>
          <StInputWrapper>
            <StInput>
              <p>제목</p>
              <input
                type="text"
                value={ntitle}
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  setNTitle(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>내용</p>
              <textarea
                value={ncontent}
                ref={inputRef}
                placeholder="내용을 입력하세요."
                onKeyDown={handleInputHeight}
                onKeyUp={handleInputHeight}
                onChange={(e) => {
                  setNContent(e.target.value);
                }}
              />
            </StInput>
          </StInputWrapper>

          <StBtnWrapper>
            <ConfirmButton btnName="등록하기" onClick={handleNotice} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                initData();
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StNoticeModalWrapper>
      </LargeModal>
    )
  );
};

export default CreateNoticeModal;

const StNoticeModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem 6.4rem;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }

  & > input {
    margin: 1.2rem;
    width: 32.6rem;
    height: 3.2rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > textarea {
    margin: 1.2rem;
    width: 32.6rem;
    height: 10rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
