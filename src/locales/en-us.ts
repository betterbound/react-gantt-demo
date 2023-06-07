import type { GanttLocale } from '../Gantt'

export const enUS: GanttLocale = Object.freeze({
  today: 'Today',
  day: 'Day',
  days: 'Days',
  week: 'Week',
  week_in_month: 'Week in month',
  month: 'Month',
  quarter: 'Quarter',
  halfYear: 'Half year',
  firstHalf: 'First half',
  secondHalf: 'Second half',
  majorFormat: {
    day: 'YYYY, MMMM',
    week: 'YYYY, MMMM',
    week_in_month: 'YYYY, MMMM',
    month: 'YYYY',
    quarter: 'YYYY',
    halfYear: 'YYYY',
  },
  minorFormat: {
    day: 'D',
    week: 'wo [week]',
    week_in_month: '',
    month: 'MMMM',
    quarter: '[Q]Q',
    halfYear: 'YYYY-',
  }
})