export const getSubject = (value: string) => {
  return value.slice(value.indexOf('<title>') + 7, value.lastIndexOf('</title>'))
}
