// import 'ace-builds/src-noconflict/ext-language_tools';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';

// import { require } from 'ace-builds/src-noconflict/ace';
// import { Range } from 'ace-builds/src-noconflict/ace';
import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getDiscussions, getIssueInfo, postDiscuss } from '@/apis/studyroom';
import { StateDeleteBtn } from '@/components/Common/Button';
import { SquareModal } from '@/components/Common/Modal';
import { IcDiscussLogo } from '@/public/assets/icons';
import { issueIdState, memberIdState } from '@/recoil/atom';
import { DiscussInfo, IssueInfo, PostDiscussInfo } from '@/types/studyroom';

import CommentCard from './CommentCard';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const DiscussIssueModal = ({ isShowing, handleCancel }: Props) => {
  const memberId = useRecoilValue(memberIdState);
  const issueId = useRecoilValue(issueIdState);
  const codeRef = useRef<AceEditor>(null);

  const [isComment, setIsComment] = useState(false);
  const [suggestCode, setSuggestCode] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const [code, setCode] = useState<string>('');
  const [title, setTitle] = useState('');
  const [descrpt, setDescrpt] = useState('');
  const [giturl, setGiturl] = useState('');
  const [commentList, setCommentList] = useState<DiscussInfo[]>();
  const [discussData, setDiscussData] = useState<PostDiscussInfo>();

  const getIssueData = async () => {
    const issueInfo: IssueInfo = await getIssueInfo(issueId);
    console.log(issueInfo);
    const { issueTitle, gitCode, issueDescription, issueGitUrl } = issueInfo!;
    setCode(gitCode);
    setTitle(issueTitle);
    setDescrpt(issueDescription);
    setGiturl(issueGitUrl);
  };

  const getDiscuss = async () => {
    const discussInfo = await getDiscussions(issueId);
    console.log(discussInfo);
    setCommentList(discussInfo);
  };

  const handleOpenGithub = () => {
    window.open(`https://github.com/${giturl}`);
  };

  const handleCreateInput = () => {
    if (codeRef.current) {
      const { editor } = codeRef.current;
      const line = editor.getSelectionRange().start.row;
      const range = editor.getSelectionRange();
      const getSelectedText = editor.session.getTextRange(range);
      console.log(line, range, getSelectedText);
      setIsComment(true);
      setIndex(line);
      changeData();
      // const { Range } = ace.require('ace/range');
      // const mine = new Range(1, 0, 4, 0);
      // editor.session.addMarker(mine, 'ace_active_line', 'text');
    }
  };

  const handleCreateComment = async () => {
    console.log(index, suggestCode);
    await postDiscuss(discussData!);
  };

  const changeData = () => {
    setSuggestCode('');
  };

  // const handleHighlight = () => {
  //   // const editor = edit(this);
  //   // const { Range } = require(`ace/range`).Range;
  //   // const range = new Range(index, 0, index, Infinity);
  //   // editor.session.addMarker(range, 'ace_active_line', 'text');
  // };

  useEffect(() => {
    getIssueData();
    getDiscuss();
  }, []);

  useEffect(() => {}, [isComment]);

  useEffect(() => {
    setDiscussData({
      issueId,
      memberId,
      issueOpinion: suggestCode,
      issueOpinionLine: index,
    });
  }, [suggestCode, index]);

  return (
    isShowing && (
      <SquareModal title="이슈 디스커션" isShowing={isShowing}>
        <StDiscussWrapper>
          <StIssueWrapper>
            <StIssue>
              <IcDiscussLogo />
              <StContent>
                <h3>{title}</h3>
                <p>{descrpt}</p>
                <p>
                  🔗 깃허브 링크 :{' '}
                  <StLink onClick={handleOpenGithub}>
                    https://github.com/{giturl}
                  </StLink>
                </p>
              </StContent>
            </StIssue>
            <StCode>
              <div>
                <AceEditor
                  ref={codeRef}
                  className="github code"
                  setOptions={{ useWorker: false }}
                  placeholder="this is code editor"
                  mode="python"
                  theme="tomorrow"
                  name="codeInput"
                  height="30rem"
                  width="100%"
                  fontSize={12}
                  showPrintMargin
                  showGutter
                  highlightActiveLine
                  readOnly
                  value={code}
                  onCursorChange={() => {
                    handleCreateInput();
                  }}
                />
              </div>
            </StCode>
          </StIssueWrapper>
          <StCommentWrapper>
            <StTitle>
              <div>
                <p>의견</p>
                <span>{commentList?.length}</span>
              </div>
              <StateDeleteBtn btnName="창 닫기" handleClick={handleCancel} />
            </StTitle>
            <StComment>
              {commentList &&
                commentList.map((comment) => (
                  <CommentCard
                    coderef={codeRef}
                    key={comment.opinionId}
                    commentInfo={comment}
                  />
                ))}
            </StComment>
            {/* {isSubmit &&
              commentList?.map((comment) => (
                <CommentCard
                  key={comment}
                  coderef={codeRef}
                  code={suggestCode}
                  index={index}
                />
              ))} */}
            {isComment && (
              <StInput>
                <textarea
                  placeholder="코멘트를 입력하세요"
                  value={suggestCode}
                  onChange={(e) => {
                    setSuggestCode(e.target.value);
                  }}
                />
                <button type="button" onClick={handleCreateComment}>
                  입력
                </button>
              </StInput>
            )}
            {/* <CommentCard /> */}
          </StCommentWrapper>
        </StDiscussWrapper>
      </SquareModal>
    )
  );
};

export default DiscussIssueModal;

const StDiscussWrapper = styled.div`
  display: flex;
`;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  flex-wrap: wrap;

  padding: 1.5rem 2.4rem 2.4rem 3.4rem;
  box-sizing: border-box;

  border-right: 0.1rem solid ${({ theme }) => theme.colors.Learniverse_BG};
`;
const StCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;
  margin-top: 2.4rem;
  margin-left: 1.4rem;
  margin-right: 1.4rem;
  gap: 1rem;

  position: relative;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;

  & > div {
    display: flex;
  }

  & > div > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > div > span {
    text-align: center;
    align-items: center;

    height: 2rem;
    width: 2rem;
    margin-left: 1rem;
    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.Green};
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StComment = styled.div``;

const StIssue = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.4rem;

  & > div {
    display: flex;
    margin-top: 1rem;
  }

  & > hr {
    margin-top: 1rem;

    background-color: ${({ theme }) => theme.colors.Learniverse_BG};
  }

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > p {
    align-items: center;
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StCode = styled.div``;

const StLink = styled.button`
  ${({ theme }) => theme.fonts.Body9};
  color: ${({ theme }) => theme.colors.Purple4};
`;

const StInput = styled.div`
  padding: 0.5rem;
  display: flex;
  position: absolute;
  bottom: 3rem;

  width: 90%;

  align-items: center;
  justify-content: space-between;

  border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
  border-radius: 1rem;

  & > textarea {
    height: 5rem;
    width: 80%;
    border: none;
    resize: none;
    background-color: ${({ theme }) => theme.colors.LightGray1};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body7};
  }

  & > button {
    width: 3.5rem;
    height: 2.2rem;

    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body6};
  }
`;
