import { setState } from '@/config'

export const unauthenticate = () => {
  setState('authorization', undefined)
}
