import { setState, StageEnum } from '@/config'

const connect = (stage: StageEnum) => {
  setState('stage', stage)
}

export default connect
