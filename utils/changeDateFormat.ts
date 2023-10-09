export const changeDateFormat = (time: string) => {
  const date = new Date(time);

  const change: string = `${date.getMonth() + 1}월 ${date.getDate()}일 ${
    (date.getHours() < 9 ? '0' : '') + date.getHours()
  } : ${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

  return change;
};
