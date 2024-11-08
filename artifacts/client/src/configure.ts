import { setState, State } from '@/config'

const configure = ({ stage }: Partial<Pick<State, 'stage'>>) => {
  stage && setState('stage', stage)
}

export default configure
