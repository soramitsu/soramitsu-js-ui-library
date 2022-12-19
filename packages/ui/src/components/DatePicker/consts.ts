export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AuG', 'SEP', 'OCT', 'NOV', 'DEC']

export const daysNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const TIME_POINTS: string[] = (() => {
  const res = []

  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : i
    res.push(`${hour}:00`)
    res.push(`${hour}:30`)
  }

  return res
})()
