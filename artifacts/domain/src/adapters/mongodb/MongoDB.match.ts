import { Filter, Document } from 'mongodb'
import { flatten, clearSpecialChars, isUndefined } from '@starter/shared'

const NATIVES_ARRAY = ['$in', '$nin']

const isSearchKey = (key: string) => key.split('.').reverse()[1] === 'search'

const normalizeSearchKey = (key: string) => new RegExp(clearSpecialChars(key).toLowerCase(), 'i')

export const makeMatch = (input: Record<string, any>): Filter<Document> => {
  const flattenedInput = flatten<Record<string, any>, Record<string, any>>(input)
  const flattenedResult: Record<string, any> = {}

  for (const [key, value] of Object.entries(flattenedInput)) {
    if (isUndefined(value)) {
      continue
    }

    const isSearch = isSearchKey(key)
    const newValue = isSearch ? normalizeSearchKey(`${value}`) : value

    flattenedResult[key] = newValue
  }

  const result = Object.entries(flattenedResult).reduce((acc, [key, value]) => {
    const isNative = key.startsWith('$')

    if (isNative) {
      const [nativeKey = ''] = key.split('.')
      const previousNativeValues = acc[nativeKey] ? acc[nativeKey] : []
      const newKey = key.split('.').slice(2).join('.')
      const isDeepNative = newKey.split('.').some((k) => k.startsWith('$'))

      if (isDeepNative) {
        const keys = key.split('.')
        const newDeepKey = [...keys].slice(2).slice(0, -1).join('.')
        const [deepNativeKey] = [...keys].reverse()

        return {
          ...acc,
          [nativeKey]: [...previousNativeValues, { [newDeepKey]: { [`${deepNativeKey}`]: value } }],
        }
      }

      return {
        ...acc,
        [nativeKey]: [...previousNativeValues, { [newKey]: value }],
      }
    }

    const keys = key.split('.')
    const isDeepNative = keys.some((k) => k.startsWith('$'))
    const isDeepNativeLast = keys.length > 2 ? [...keys].reverse()[0]?.startsWith('$') : false
    const isDeepNativeLastArray = isDeepNativeLast && keys.some((k) => NATIVES_ARRAY.includes(k))
    const isDeepNativeArray = isDeepNative && keys.some((k) => NATIVES_ARRAY.includes(k))

    if (isDeepNativeLast) {
      const [nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -1).join('.')
      const previousNativeArray = acc[newKey]?.[nativeKey] ? acc[newKey][nativeKey] : []
      const newValue = isDeepNativeLastArray ? [...previousNativeArray, ...value] : value

      return {
        ...acc,
        [newKey]: {
          [nativeKey]: newValue,
        },
      }
    }

    if (isDeepNativeArray) {
      const [_, nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -2).join('.')
      const previousNativeArray = acc[newKey]?.[nativeKey] ? acc[newKey]?.[nativeKey] : []

      return {
        ...acc,
        [newKey]: {
          [nativeKey]: [...previousNativeArray, value],
        },
      }
    }

    if (isDeepNative) {
      const [nativeKey = ''] = [...keys].reverse()
      const newKey = [...keys].slice(0, -1).join('.')
      const previousValue = acc[newKey] ? acc[newKey] : {}

      return {
        ...acc,
        [newKey]: { [nativeKey]: value, ...previousValue },
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {} as Record<string, any>)

  return result
}
