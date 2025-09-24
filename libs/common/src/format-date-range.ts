import { isString, isUndefined } from 'lodash'

import { state } from './~state/common.state'
import { dateFnsFormat } from './date-fns/date-fns.i18n'
import { formatDate } from './format-date'

export type FormatDateRangeOptions =
	| string
	| {
			format?: string
			separator?: string
	  }

export const formatDateRange = (
	a: string | Date,
	b: string | Date,
	options?: FormatDateRangeOptions,
) => {
	const format = isUndefined(options)
		? dateFnsFormat[state.locale]
		: isString(options)
			? options
			: options?.format
	const separator = isUndefined(options)
		? '•'
		: isString(options)
			? '•'
			: (options?.separator ?? '•')

	return `${formatDate(a, format)} ${separator} ${formatDate(b, format)}`
}
