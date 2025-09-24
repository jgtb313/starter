import { toZonedTime } from 'date-fns-tz'

import { state } from './~state/common.state'
import { dateFnsTimezones } from './date-fns/date-fns.i18n'

export const getDate = (
	date: string | Date,
	timezone: string = dateFnsTimezones[state.locale],
) => {
	return toZonedTime(date, timezone)
}
