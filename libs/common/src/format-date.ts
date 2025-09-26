import type { Locale } from '@starter/schema'
import { format } from 'date-fns-tz'
import { isString, isUndefined } from 'lodash'

import { state } from './~state/common.state'
import {
	dateFnsFormat,
	dateFnsLocales,
	dateFnsTimezones,
} from './date-fns/date-fns.i18n'
import { getDate } from './get-date'

type FormatDateOptions = {
	format?: string
	locale?: Locale
}

export const formatDate = (
	value: Date | string,
	options?: string | FormatDateOptions,
) => {
	const locale = isString(options)
		? state.locale
		: (options?.locale ?? state.locale)
	const f = isUndefined(options)
		? dateFnsFormat[locale]
		: isString(options)
			? options
			: (options?.format ?? dateFnsFormat[locale])

	const t = dateFnsTimezones[locale]
	const l = dateFnsLocales[locale]

	return format(getDate(value), f, {
		timeZone: t,
		locale: l,
	})
}
