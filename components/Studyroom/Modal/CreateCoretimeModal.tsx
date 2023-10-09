import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { createCaptureTime } from '@/apis/alarm';
import { createCoretime } from '@/apis/coretimes';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { SmallModal } from '@/components/Common/Modal';
import useModal from '@/hooks/useModal';
import { roomIdState } from '@/recoil/atom';
import { CoreTimeIdInfo, PostCoreTimeInfo } from '@/types/studyroom';

import CompleteCreateCoreModal from './CompleteCreateCoreModal';

interface Props {
  isShowing: boolean;
  handleCancel: () => void;
}

const CreateCoretimeModal = ({ isShowing, handleCancel }: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [coreHr, setCoreHr] = useState<number>(0);
  const [coreMin, setCoreMin] = useState<number>(30);
  const [capture, setCapture] = useState<number>(100);
  const [coreTimeInfo, setCoreTimeInfo] = useState<PostCoreTimeInfo>();
  const roomID = useRecoilValue(roomIdState);

  const complete = useModal();

  const handleCreateCtime = async () => {
    // if (startDate.getMinutes() !== 30 && startDate.getMinutes() !== 0) {
    //   alert('시작시간은 30분 단위로 지정하세요.');
    // }
    if ((coreHr === 0 && coreMin === 0) || (coreHr === 24 && coreMin === 30)) {
      alert('코어타임은 최소 30분 - 최대 24시간 내로 지정하세요.');
    } else {
      const { coreTimeId }: CoreTimeIdInfo = await createCoretime(
        coreTimeInfo!,
      );
      if (coreTimeId) {
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + coreHr);
        endDate.setMinutes(startDate.getMinutes() + coreMin);

        const captureTimeData = {
          coreTimeId,
          startTime: startDate,
          endTime: endDate,
          captureCount: capture,
        };
        console.log('captureTimeData', captureTimeData);
        await createCaptureTime(captureTimeData);
      }
      handleCancel();
    }
  };
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour = parseInt(e.target.value, 10);
    if (hour < 0 || hour > 24) {
      alert('0 - 24시간 범위에서 입력하세요');
    } else {
      setCoreHr(hour);
    }
  };
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value, 10);
    if (min !== 0 && min !== 30) {
      alert('30분 단위로 입력하세요');
    } else {
      setCoreMin(min);
    }
  };
  const handleCaptureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const captureNumber = parseInt(e.target.value, 10);
    if (captureNumber < 0 || captureNumber > 100) {
      alert('0 - 5번 이내로 입력하세요');
    } else {
      setCapture(captureNumber);
    }
  };

  useEffect(() => {
    setCoreTimeInfo({
      roomId: roomID,
      coreStartTime: startDate,
      coreHour: coreHr,
      coreMinute: coreMin,
      captureNum: capture,
    });
  }, [startDate, coreHr, coreMin, capture]);

  return (
    isShowing && (
      <>
        <SmallModal title="코어타임 등록하기" isShowing={isShowing}>
          <StCoretimeModalWrapper>
            <StInputWrapper>
              <StDate>
                <p>진행 날짜</p>
                <CustomDatePicker
                  dateFormat="yyyy.MM.dd HH:mm"
                  selected={startDate}
                  minDate={new Date()}
                  showTimeSelect
                  onChange={(date: Date) => setStartDate(date)}
                />
              </StDate>
              <StTime>
                <p>진행 시간</p>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={coreHr}
                    onChange={handleHourChange}
                  />
                  <p>시간</p>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="30"
                    value={coreMin}
                    onChange={handleMinChange}
                  />
                  <p>분</p>
                </div>
              </StTime>
              <StCapture>
                <p>랜덤 캡처</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={capture}
                  onChange={handleCaptureChange}
                />
                <p>번</p>
              </StCapture>
            </StInputWrapper>

            <StBtnWrapper>
              <ConfirmButton btnName="등록하기" onClick={handleCreateCtime} />
              <CancelButton
                btnName="취소"
                onClick={() => {
                  handleCancel();
                }}
              />
            </StBtnWrapper>
          </StCoretimeModalWrapper>
        </SmallModal>
        <StCompleteModalWrapper $showing={complete.isShowing}>
          <CompleteCreateCoreModal
            isShowing={complete.isShowing}
            handleCancel={complete.toggle}
          />
        </StCompleteModalWrapper>
      </>
    )
  );
};

export default CreateCoretimeModal;

const StCoretimeModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem 6.4rem;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  width: 31rem;
`;

const StDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/jsx-props-no-spreading
const DatePickerWrapper: React.FC<any> = (props) => <DatePicker {...props} />;

const CustomDatePicker = styled(DatePickerWrapper)`
  width: 20rem;
  height: 3.2rem;

  text-align: center;

  border-radius: 0.4rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
  background-color: ${({ theme }) => theme.colors.White};

  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Learniverse_BG};
`;

const StTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p,
  div > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }
  & > div {
    display: flex;
    align-items: center;
  }

  & > div > input {
    text-align: center;
    margin: 1.2rem;
    width: 5rem;
    height: 3.2rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }

  & > div > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }
`;
const StCapture = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }
  & > input {
    text-align: center;
    margin: 1.2rem;
    width: 16rem;
    height: 3.2rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }

  & > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StCompleteModalWrapper = styled.div<{ $showing: boolean }>`
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
