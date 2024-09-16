import { Filter, Document } from 'mongodb'
import { flatten, clearSpecialChars, isUndefined, isString } from '@starter/shared'

import { IContext } from '@/core/shared/types'

const NATIVES_ARRAY = ['$in', '$nin']

const checkIfKeyIsSearch = (value: string) => value.split('.').reverse()?.[1] === 'search'

const normalizeSearchKey = (value: string) => new RegExp(clearSpecialChars(value).toLowerCase(), 'i')

export const makeMatch = (input: Record<string, any>, _context?: IContext): Filter<Document> => {
  const inputFlattened = flatten<Record<string, any>, Record<string, any>>(input)

  const resultFlattened: Record<string, any> = {}

  for (const [key, value] of Object.entries(inputFlattened)) {
    if (isUndefined(value)) {
      continue
    }

    const isSearch = checkIfKeyIsSearch(key)

    const newValue = isSearch ? normalizeSearchKey(isString(value) ? value : `${value}`) : value

    resultFlattened[key] = newValue
  }

  const result = Object.entries(resultFlattened).reduce((state, [key, value]) => {
    const isNative = key.startsWith('$')

    if (isNative) {
      const [nativeKey = ''] = key.split('.')
      const previousValueNative = state[nativeKey] ? state[nativeKey] : []
      const newKey = key.split('.').slice(2).join('.')
      const isDeepNative = newKey.split('.').some((k) => k.startsWith('$'))

      if (isDeepNative) {
        const keys = key.split('.')
        const newKey = [...keys].slice(2).slice(0, -1).join('.')
        const [deepNativeKey] = [...keys].reverse()

        return {
          ...state,
          [nativeKey]: [...previousValueNative, { [newKey]: { [`${deepNativeKey}`]: value } }]
        }
      }

      return {
        ...state,
        [nativeKey]: [...previousValueNative, { [newKey]: value }]
      }
    }

    const keys = key.split('.')
    const isDeepNative = keys.some((k) => k.startsWith('$'))
    const isDeepNativeLast = keys.length > 2 ? [...keys].reverse()?.[0]?.startsWith('$') : false
    const isDeepNativeLastArray = isDeepNativeLast && keys.some((k) => NATIVES_ARRAY.includes(k))
    const isDeepNativeArray = isDeepNative && keys.some((k) => NATIVES_ARRAY.includes(k))

    if (isDeepNativeLast) {
      const [nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -1).join('.')

      const previousValueNativeArray = state[newKey]?.[nativeKey] ? state[newKey]?.[nativeKey] : []
      const newValue = isDeepNativeLastArray ? [...previousValueNativeArray, ...value] : value

      return {
        ...state,
        [newKey]: {
          [nativeKey]: newValue
        }
      }
    }

    if (isDeepNativeArray) {
      const [_, nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -2).join('.')

      const previousValueNativeArray = state[newKey]?.[nativeKey] ? state[newKey]?.[nativeKey] : []

      return {
        ...state,
        [newKey]: {
          [nativeKey]: [...previousValueNativeArray, value]
        }
      }
    }

    if (isDeepNative) {
      const [nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -1).join('.')

      const previousValue = state[newKey] ? state[newKey] : {}

      return {
        ...state,
        [newKey]: { [nativeKey]: value, ...previousValue }
      }
    }

    return {
      ...state,
      [key]: value
    }
  }, {} as Record<string, any>)

  console.log({
    inputFlattened,
    resultFlattened: JSON.stringify(resultFlattened, null, 2),
    result: JSON.stringify(result, null, 2)
  })

  return result
}
