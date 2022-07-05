import { DateTime, DateTimeUnit } from 'luxon'
import { Options } from './types'

function getDate(deltaDay = 0, deltaMonth = 0, deltaYear = 0) {
  let date = DateTime.now()
  return date.plus({ years: deltaYear, months: deltaMonth, days: deltaDay }).set({ minute: 0, hour: 0 }).toJSDate()
}

function getRange(dateFrom: Date, dateTo: Date) {
  return {
    startDate: dateFrom,
    endDate: dateTo,
    selecting: false,
    selectedField: 'endDate',
  }
}

interface Deltas {
  // from today, d - days, m - months, y - years
  d?: number
  m?: number
  y?: number
}

function getTargetDate(deltas: Deltas | undefined) {
  if (deltas) {
    const { d, m, y } = deltas
    return getDate(d, m, y)
  } else {
    return new Date()
  }
}

function getStartOf(field: DateTimeUnit, deltas?: Deltas) {
  const targetDate = getTargetDate(deltas)
  let datetime = DateTime.fromJSDate(targetDate)
  return datetime.startOf(field).toJSDate()
}

function getEndOf(field: DateTimeUnit, deltas?: Deltas) {
  const targetDate = getTargetDate(deltas)
  let datetime = DateTime.fromJSDate(targetDate)
  return datetime.endOf(field).toJSDate()
}

export const options: Options = {
  day: [
    {
      label: 'Today',
      value: getDate(),
    },
    {
      label: 'Yesterday',
      value: getDate(-1),
    },
    {
      label: 'Tomorrow',
      value: getDate(1),
    },
    {
      label: 'Next week',
      value: getDate(7),
    },
    {
      label: 'Next month',
      value: getDate(0, 1),
    },
    {
      label: 'Custom',
      value: getDate(),
    },
  ],

  range: [
    {
      label: 'This week',
      value: getRange(getStartOf('week'), getEndOf('week')),
    },
    {
      label: 'Last week',
      value: getRange(getStartOf('week', { d: -7 }), getEndOf('week', { d: -7 })),
    },
    {
      label: 'Next week',
      value: getRange(getStartOf('week', { d: 7 }), getEndOf('week', { d: 7 })),
    },
    {
      label: 'This month',
      value: getRange(getStartOf('month'), getEndOf('month')),
    },
    {
      label: 'Last month',
      value: getRange(getStartOf('month', { m: -1 }), getEndOf('month', { m: -1 })),
    },
    {
      label: 'Next month',
      value: getRange(getStartOf('month', { m: 1 }), getEndOf('month', { m: 1 })),
    },
    {
      label: 'This year',
      value: getRange(getStartOf('year'), getEndOf('year')),
    },
    {
      label: 'Custom',
      value: getRange(getStartOf('week'), getEndOf('week')),
    },
  ],
}
