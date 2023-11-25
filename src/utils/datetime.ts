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

