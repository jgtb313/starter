export const deepReplace = <T>(obj: T, replacements: { [key: string]: any }): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const result: { [key: string]: any } = Array.isArray(obj) ? [] : {}

  for (const [key, value] of Object.entries(obj)) {
    result[key] = deepReplace(value, replacements)
  }

  for (const [key, replacement] of Object.entries(replacements)) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = replacement
    }
  }

  return result as T
}
