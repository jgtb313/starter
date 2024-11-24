import { StageEnum } from '@starter/config'

import { setState } from '@/config'

const connect = (stage: StageEnum) => {
  setState('stage', stage)
}

export default connect
