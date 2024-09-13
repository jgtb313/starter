import { setState, EnvEnum } from '@/config'

const connect = (env: EnvEnum) => {
  setState('env', env)
}

export default connect
