type FlattenOptions = {
  delimiter?: string
  maxDepth?: number
  transformKey?: (key: string) => string
  safe?: boolean
  overwrite?: boolean
  object?: boolean
}

type UnflattenOptions = FlattenOptions

const isBuffer = (obj: any): boolean => obj && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)

const keyIdentity = (key: string): string => key

export const flatten = (target: Record<string, any>, opts: FlattenOptions = {}): Record<string, any> => {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const maxDepth = opts.maxDepth ?? 0
  const transformKey = opts.transformKey || keyIdentity
  const output: Record<string, any> = {}

  const step = (object: Record<string, any>, prev: string, currentDepth = 1): void => {
    Object.keys(object).forEach((key) => {
      const value = object[key]
      const isarray = opts.safe && Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isbuffer = isBuffer(value)
      const isobject = type === '[object Object]' || type === '[object Array]'

      const newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key)

      if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target, '')

  return output
}

export const unflatten = (target: Record<string, any>, opts: UnflattenOptions = {}): Record<string, any> => {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const overwrite = opts.overwrite || false
  const transformKey = opts.transformKey || keyIdentity
  const result: Record<string, any> = {}

  const isbuffer = isBuffer(target)
  if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
    return target
  }

  const getkey = (key: string): string | number => {
    const parsedKey = Number(key)
    return isNaN(parsedKey) || key.indexOf('.') !== -1 || opts.object ? key : parsedKey
  }

  const addKeys = (keyPrefix: string, recipient: Record<string, any>, target: Record<string, any>): Record<string, any> =>
    Object.keys(target).reduce((result, key) => {
      result[keyPrefix + delimiter + key] = target[key]
      return result
    }, recipient)

  const isEmpty = (val: any): boolean => {
    const type = Object.prototype.toString.call(val)
    const isArray = type === '[object Array]'
    const isObject = type === '[object Object]'

    if (!val) {
      return true
    } else if (isArray) {
      return !val.length
    } else if (isObject) {
      return !Object.keys(val).length
    }
    return false
  }

  target = Object.keys(target).reduce(
    (result, key) => {
      const type = Object.prototype.toString.call(target[key])
      const isObject = type === '[object Object]' || type === '[object Array]'
      if (!isObject || isEmpty(target[key])) {
        result[key] = target[key]
        return result
      } else {
        return addKeys(key, result, flatten(target[key], opts))
      }
    },
    {} as Record<string, any>,
  )

  Object.keys(target).forEach((key) => {
    const split = key.split(delimiter).map(transformKey)
    let key1 = getkey(split.shift()!)
    let key2 = getkey(split[0])
    let recipient = result

    while (key2 !== undefined) {
      if (key1 === '__proto__') {
        return
      }

      const type = Object.prototype.toString.call(recipient[key1])
      const isobject = type === '[object Object]' || type === '[object Array]'

      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
        return
      }

      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
        recipient[key1] = typeof key2 === 'number' && !opts.object ? [] : {}
      }

      recipient = recipient[key1]
      if (split.length > 0) {
        key1 = getkey(split.shift()!)
        key2 = getkey(split[0])
      }
    }

    recipient[key1] = unflatten(target[key], opts)
  })

  return result
}
