import { toZonedTime } from 'date-fns-tz'

export const getDate = (
	date: string | Date,
	timezone: string = 'America/Sao_Paulo',
) => {
	return toZonedTime(date, timezone)
}
