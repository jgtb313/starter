import { setState, State } from '@/config'

export const configure = ({ stage, authorization }: Partial<Pick<State, 'stage' | 'authorization'>>) => {
  if (stage) {
    setState('stage', stage)
  }

  if (authorization) {
    setState('authorization', authorization)
  }
}
