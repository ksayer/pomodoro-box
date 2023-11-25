export const currentDate = () => {
  const today = new Date();
  return dateToStoreFormat(today);
}

export const dateToStoreFormat = (date: Date) => {
  return date.toISOString().split('T')[0]
}
