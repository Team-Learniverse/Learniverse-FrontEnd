// import { addMoon } from '@/apis/profile';
// import { memberIdState, moonScoreState, todayState } from '@/recoil/atom';
// import getToday from '@/utils/getToday';
// import { totalMoonScoreSelector } from '@/recoil/selector';

// const [moonScore, setMoonScore] = useRecoilState(moonScoreState);
// const [lastDay, setLastDay] = useRecoilState(todayState);
// const totalMoonScore = useRecoilValue(totalMoonScoreSelector);

// const isMax = () => {
//   return totalMoonScore >= 4;
// };

// const addFirstAccess = () => {
//   if (isMax() || moonScore.isFirstAccess >= 1) return;
//   setMoonScore((prevMoonScore) => ({
//     ...prevMoonScore,
//     isFirstAccess: prevMoonScore.isFirstAccess + 1,
//   }));
// };

// const addCoreTimeAccess = () => {
//   if (isMax()) return;
//   setMoonScore((prevMoonScore) => ({
//     ...prevMoonScore,
//     isCoreTimeParticipate: prevMoonScore.isCoreTimeParticipate + 1,
//   }));
// };

// const addCapture = () => {
//   if (isMax()) return;
//   setMoonScore((prevMoonScore) => ({
//     ...prevMoonScore,
//     isCapture: prevMoonScore.isCapture + 1,
//   }));
// };

// const initMoonScore = () => {
//   setMoonScore({
//     isFirstAccess: 0,
//     isCoreTimeParticipate: 0,
//     isCapture: 0,
//   });
// };

// useEffect(() => {
//   const today = getToday();
//   if (lastDay !== today) {
//     setLastDay(today);
//     initMoonScore();
//     addFirstAccess();
//   }
// }, []);

// useEffect(() => {
//   const addMoons = async () => {
//     const res = await addMoon(memberId, totalMoonScore);
//     if (res === 400) return null;
//     return res;
//   };
//   addMoons();
// }, [moonScore]);
