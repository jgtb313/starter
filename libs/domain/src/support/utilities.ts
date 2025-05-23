export const deepMapDatesToISOString = <T>(obj: unknown): T => {
  if (obj instanceof Date) {
    return obj.toISOString() as T
  }

  if (Array.isArray(obj)) {
    return obj.map(deepMapDatesToISOString) as T
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepMapDatesToISOString(value)])) as T
  }

  return obj as T
}
