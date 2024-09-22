export const getSubject = (value: string) => {
  const start = value.indexOf('<title>') + 7
  const end = value.indexOf('</title>')

  if (start === -1 || end === -1 || start >= end) {
    return ''
  }

  return value.slice(start, end)
}
