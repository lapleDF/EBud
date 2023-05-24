export const getDisplayedTimeVideo = (time: number) => {
  const digit = (value: number) => (value < 10 ? `0${value}` : `${value}`);
  const sec = digit(Math.floor(time % 60));
  const min = digit(Math.floor((time / 60) % 60));
  return min + ':' + sec;
};
