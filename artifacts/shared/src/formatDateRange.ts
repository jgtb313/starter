import { isUndefined, isString } from 'lodash-es'

import { formatDate } from './formatDate'

export type FormatDageRangeOptions =
  | string
  | {
      format?: string
      separator?: string
    }

export const formatDateRange = (a: string | Date, b: string | Date, options?: FormatDageRangeOptions) => {
  const format = isUndefined(options) ? 'dd/MM/yyyy' : isString(options) ? options : options?.format
  const separator = isUndefined(options) ? '•' : isString(options) ? '•' : options?.separator ?? '•'

  return `${formatDate(a, format)} ${separator} ${formatDate(b, format)}`
}
