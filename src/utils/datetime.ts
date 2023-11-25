export type TWeekDays = Record<number, string>;

export const WeekDaysFull: TWeekDays = {
  0: 'Понедельник',
  1: 'Вторник',
  2: 'Среда',
  3: 'Четверг',
  4: 'Пятница',
  5: 'Суббота',
  6: 'Воскресенье',
}

export const WeekDayShort: TWeekDays = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Cб',
  0: 'Вс',
}


export const currentDate = () => {
  const today = new Date();
  return dateToStoreFormat(today);
}

export const dateToStoreFormat = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export function getDayIndexWithMondayAsFirstDay(date: Date) {
  const dayIndex = date.getDay();
  return (dayIndex === 0) ? 6 : dayIndex - 1;
}
