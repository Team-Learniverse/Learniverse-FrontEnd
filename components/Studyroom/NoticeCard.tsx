import { useRecoilValue } from 'recoil';
/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { memberIdState } from '@/recoil/atom';
import { NoticeInfo } from '@/types/studyroom';

import ModifyNoticeModal from './Modal/ModifyNoticeModal';

interface Props {
  noticeInfo: NoticeInfo;
}

const NoticeCard = ({ noticeInfo }: Props) => {
  const { memberId, title, content } = noticeInfo;
  const curMemberId = useRecoilValue(memberIdState);

  const modify = useModal();

  const handleModify = () => {
    if (curMemberId === memberId) {
      console.log(curMemberId, memberId);
      modify.toggle();
    }
  };
  return (
    <>
      <StNoticeCardWrapper
        onClick={handleModify}
        $curMemberId={curMemberId}
        $memberId={memberId}
      >
        <StTitle>
          <h2>{title}</h2>
          <p>작성자 : {memberId}</p>
        </StTitle>
        <StContent>
          <p>{content}</p>
        </StContent>
      </StNoticeCardWrapper>
      <StModifyModalWrapper $showing={modify.isShowing}>
        <ModifyNoticeModal
          isShowing={modify.isShowing}
          noticeInfo={noticeInfo}
          handleCancel={modify.toggle}
        />
      </StModifyModalWrapper>
    </>
  );
};

export default NoticeCard;

const StNoticeCardWrapper = styled.div<{
  $curMemberId: number;
  $memberId: number;
}>`
  width: 73rem;
  padding: 0.5rem;

  border-radius: 1rem;

  background: ${({ theme }) => theme.colors.LightGray2};

  cursor: ${({ $curMemberId, $memberId }) =>
    $curMemberId === $memberId ? 'pointer' : 'default'};
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 5rem;

  & > h2 {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title3};
  }
  & > p {
    margin-left: 10rem;
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body2};
  }
`;
const StContent = styled.div`
  margin: 0 5rem;
  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body1};
  }
  white-space: pre-wrap;
`;

const StModifyModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
