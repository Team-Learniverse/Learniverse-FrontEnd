export const getTime = (date: Date) => {
  const formattedTime = `${String(date.getUTCHours()).padStart(
    2,
    '0',
  )}:${String(date.getUTCMinutes()).padStart(2, '0')}`;

  return formattedTime;
};
