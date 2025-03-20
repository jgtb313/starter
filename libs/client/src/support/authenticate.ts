import { setState } from '@/config'

export const authenticate = (value: string) => {
  setState('authorization', value)
}
