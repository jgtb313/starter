import { setState, State } from '@/config'

const configure = ({ stage, authorization }: Partial<Pick<State, 'stage' | 'authorization'>>) => {
  stage && setState('stage', stage)

  authorization && setState('authorization', authorization)
}

export default configure
