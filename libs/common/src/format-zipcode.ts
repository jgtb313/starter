export const formatZipcode = (value: string) => {
  value = value.replace('-', '')

  return `${value.substring(0, 5)}-${value.substring(5, 8)}`
}
