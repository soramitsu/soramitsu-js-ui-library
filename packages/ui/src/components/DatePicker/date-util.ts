export const getStartDateInCalendar = (year: number, month: number) => {
  const result = new Date(year, month, 1)
  const day = result.getDay()

  if (day === 0) {
    return prevDate(result, 7)
  } else {
    return prevDate(result, day)
  }
}

export const prevDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount)
}

export const nextDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}
