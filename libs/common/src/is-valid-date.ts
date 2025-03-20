import { isValid, parseISO, parse } from 'date-fns'

export const isValidDate = (date: string | Date): boolean => {
  if (date instanceof Date) {
    return isValid(date)
  }

  if (typeof date === 'string') {
    date = date.includes('/') ? date.split('/').reverse().join('-') : date

    const isoDate = parseISO(date)

    if (isValid(isoDate)) {
      return true
    }

    const formats = ['yyyy-MM-dd', "yyyy-MM-dd'T'HH:mm:ss", 'dd/MM/yyyy', "dd/MM/yyyy'T'HH:mm:ss", 'dd/MM/yyyy HH:mm:ss']

    return formats.some((format) => {
      const parsedDate = parse(date as string, format, new Date())

      return isValid(parsedDate)
    })
  }

  return false
}
