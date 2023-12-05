type SpecialTime = {
  hours: number,
  minutes: number,
  seconds: number
}

export const convertSeconds = (durationSeconds: number): SpecialTime => {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;

  return { hours, minutes, seconds };
};
