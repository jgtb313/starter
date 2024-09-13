import { setState } from '@/config'

const unauthenticate = () => {
  setState('authorization', '')
}

export default unauthenticate
