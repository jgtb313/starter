import type { Locale } from '@starter/schema'
import { isString, isUndefined } from 'lodash'

import { state } from './~state/common.state'
import { dateFnsFormat } from './date-fns/date-fns.i18n'
import { formatDate } from './format-date'

export type FormatDateRangeOptions =
	| string
	| {
			format?: string
			separator?: string
			locale?: Locale
	  }

export const formatDateRange = (
	a: string | Date,
	b: string | Date,
	options?: FormatDateRangeOptions,
) => {
	const locale = isString(options)
		? state.locale
		: (options?.locale ?? state.locale)
	const separator = isUndefined(options)
		? '•'
		: isString(options)
			? '•'
			: (options?.separator ?? '•')
	const f = isUndefined(options)
		? dateFnsFormat[locale]
		: isString(options)
			? options
			: (options?.format ?? dateFnsFormat[locale])

	const dateA = formatDate(a, {
		format: f,
		locale,
	})
	const dateB = formatDate(b, {
		format: f,
		locale,
	})

	return `${dateA} ${separator} ${dateB}`
}
