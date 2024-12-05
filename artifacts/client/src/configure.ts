import { setState, State } from '@/config'

const configure = ({ stage, authorization }: Partial<Pick<State, 'stage' | 'authorization'>>) => {
  if (stage) {
    setState('stage', stage)
  }

  if (authorization) {
    setState('authorization', authorization)
  }
}

export default configure
