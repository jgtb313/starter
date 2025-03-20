import { toZonedTime } from 'date-fns-tz'

export const getDate = (date: string | Date) => {
  return toZonedTime(date, 'America/Sao_Paulo')
}
