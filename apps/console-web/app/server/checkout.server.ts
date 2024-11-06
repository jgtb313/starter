import { json } from '@remix-run/node'
import client from '@ss/client'

import { getEnv } from '~/support/utilities'

export const setupCheckoutLayout = async () => {
  const env = getEnv()

  client.connect(env)

  return json({})
}
