export const defineCookies = (value: string) => {
  return value.split(';').reduce<{ token: string }>(
    (result, cookieItem) => {
      const [key, value] = cookieItem.split('=')

      return { ...result, [key.trim()]: value }
    },
    { token: '' },
  )
}
