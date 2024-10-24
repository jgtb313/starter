import { useLocalStorage as use } from '@mantine/hooks'

export const useLocalStorage = <T>(key: string, defaultValue?: T) => {
  return use({
    key,
    getInitialValueInEffect: true,
    defaultValue
  })
}
