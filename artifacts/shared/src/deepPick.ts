import { get, set, isPlainObject, isArray } from 'lodash-es'

type DeepPickKeys = string | string[]

type DeepPickValue = Record<string, any> | DeepPickValue[]

export const deepPick = (keys: DeepPickKeys, value: DeepPickValue) => {
  if (!keys.length) {
    return value
  }

  const keyPaths = isArray(keys) ? keys : keys.split(',')

  return keyPaths.reduce((result, currentPath) => {
    const topLevelPath = currentPath.includes('[]') ? currentPath.replace('[]', '').split('.')[0] : currentPath

    const extractedValue = get(value, topLevelPath)

    if (isPlainObject(extractedValue)) {
      set(result, topLevelPath, extractedValue)
    } else if (isArray(extractedValue)) {
      const remainingPath = currentPath.split('.').slice(1).join('.')

      if (!result[topLevelPath]) {
        result[topLevelPath] = []
      }

      extractedValue.forEach((item, index) => {
        if (isPlainObject(item)) {
          const nestedResult = deepPick(remainingPath, item)

          if (!result[topLevelPath][index]) {
            result[topLevelPath][index] = {}
          }

          Object.assign(result[topLevelPath][index], nestedResult)
        } else {
          set(result, topLevelPath, extractedValue)
        }
      })
    } else {
      set(result, topLevelPath, extractedValue)
    }

    return result
  }, {} as Record<string, any>)
}
