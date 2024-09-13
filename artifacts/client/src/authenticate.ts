import { setState } from '@/config'

const authenticate = (value: string) => {
  setState('authorization', value)
}

export default authenticate
