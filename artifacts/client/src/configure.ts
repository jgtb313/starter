import { setState, State } from '@/config'

const configure = ({ env }: Partial<Pick<State, 'env'>>) => {
  env && setState('env', env)
}

export default configure
