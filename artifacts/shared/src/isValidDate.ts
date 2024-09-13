import { isString } from 'lodash-es'
import { isValid } from 'date-fns'

import { getDate } from './getDate'

export const isValidDate = (value: string | Date) => {
  if (isString(value)) {
    return isValid(value) || isValid(getDate(value.split('/').reverse().join('-')))
  }

  return isValid(value)
}
