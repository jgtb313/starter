import { utcToZonedTime } from 'date-fns-tz'

export const getDate = (date: string | Date) => {
  return utcToZonedTime(date, 'America/Sao_Paulo')
}
