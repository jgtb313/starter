import { setState } from '@/config'

const unauthenticate = () => {
  setState('authorization', undefined)
}

export default unauthenticate
