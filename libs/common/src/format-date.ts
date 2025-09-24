import { format } from 'date-fns-tz'

import { state } from './~state/common.state'
import { dateFnsLocales, dateFnsTimezones } from './date-fns/date-fns.i18n'
import { getDate } from './get-date'

export const formatDate = (value: Date | string, f = 'dd/MM/yyyy') => {
	const t = dateFnsTimezones[state.locale]
	const l = dateFnsLocales[state.locale]

	return format(getDate(value), f, {
		timeZone: t,
		locale: l,
	})
}
