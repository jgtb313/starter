import { state } from '@/config'
import { connect } from '@/support/connect'
import { configure } from '@/support/configure'
import { authenticate } from '@/support/authenticate'
import { unauthenticate } from '@/support/unauthenticate'

export * from '@/support/types'
export * from '@/resources.generated'

const client = {
  state,
  connect,
  configure,
  authenticate,
  unauthenticate,
}

export type Client = typeof client

export default client
