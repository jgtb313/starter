import { state } from '@/config'
import connect from '@/connect'
import configure from '@/configure'
import authenticate from '@/authenticate'
import unauthenticate from '@/unauthenticate'
import * as resources from '@/resources'

export * from '@/support/utilities'

const client = {
  state,
  connect,
  configure,
  authenticate,
  unauthenticate,
  ...resources,
}

export type Client = typeof client

export default client
