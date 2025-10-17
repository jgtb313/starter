import type { Locale } from '@starter/schema'

import { toZonedTime } from 'date-fns-tz'

import { state } from './~state/common.state'
import { dateFnsTimezones } from './date-fns/date-fns.i18n'

export const getDate = (date: string | Date, locale?: Locale) => {
	const l = locale ?? state.locale
	const t = dateFnsTimezones[l]

	return toZonedTime(date, t)
}
