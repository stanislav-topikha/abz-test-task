export const getMinutesDifference = (firtsDate: Date, secondDate: Date): number => (
  Math.abs(secondDate.getTime() - firtsDate.getTime()) / 60000
);
