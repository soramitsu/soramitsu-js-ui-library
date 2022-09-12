<script lang="ts">
import {
  addDays,
  addMonths,
  addYears,
  startOfDay,
  startOfMonth,
  endOfMonth,
  startOfToday,
  startOfTomorrow,
  startOfYear,
  endOfYear,
  startOfYesterday,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import { Options } from './types'

export default {
  setup(props: any, ctx: any) {
    function getDate(deltaDay = 0, deltaMonth = 0, deltaYear = 0) {
      let date = startOfToday()
      if (deltaDay) date = addDays(date, deltaDay)
      if (deltaMonth) date = addMonths(date, deltaMonth)
      if (deltaYear) date = addYears(date, deltaYear)
      return date
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

    const options: Options = {
      day: [
        {
          label: 'Today',
          value: getDate(),
        },
        {
          label: 'Yesterday',
          value: startOfYesterday(),
        },
        {
          label: 'Tomorrow',
          value: startOfTomorrow(),
        },
        {
          label: 'Next week',
          value: startOfDay(getDate(7)),
        },
        {
          label: 'Next month',
          value: startOfDay(getDate(0, 1)),
        },
        {
          label: 'Custom',
          value: getDate(),
        },
      ],

      range: [
        {
          label: 'This week',
          value: getRange(startOfWeek(getDate(), { weekStartsOn: 1 }), endOfWeek(getDate(), { weekStartsOn: 1 })),
        },
        {
          label: 'Last week',
          value: getRange(startOfWeek(getDate(-7), { weekStartsOn: 1 }), endOfWeek(getDate(-7), { weekStartsOn: 1 })),
        },
        {
          label: 'Next week',
          value: getRange(startOfWeek(getDate(7), { weekStartsOn: 1 }), endOfWeek(getDate(7), { weekStartsOn: 1 })),
        },
        {
          label: 'This month',
          value: getRange(startOfMonth(getDate()), endOfMonth(getDate())),
        },
        {
          label: 'Last month',
          value: getRange(startOfMonth(getDate(0, -1)), endOfMonth(getDate(0, -1))),
        },
        {
          label: 'Next month',
          value: getRange(startOfMonth(getDate(0, 1)), endOfMonth(getDate(0, 1))),
        },
        {
          label: 'This year',
          value: getRange(startOfYear(getDate()), endOfYear(getDate())),
        },
        {
          label: 'Custom',
          value: getRange(startOfWeek(getDate()), endOfWeek(getDate())),
        },
      ],
    }
    return () =>
      ctx.slots.default({
        options: options,
      })
  },
}
</script>
