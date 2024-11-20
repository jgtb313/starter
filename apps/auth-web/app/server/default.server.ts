import { redirect, json, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import client from '@starter/client'
import { getClientIdInfos } from '~/support/get-client-id-infos'

export const setupDefaultLayout = async (args: LoaderFunctionArgs) => {
  const stage = import.meta.env.VITE_STAGE

  client.connect(stage)

  const clientIdInfos = getClientIdInfos(args)

  if (clientIdInfos === false) {
    return redirect(config.oauth.fallbackUrl)
  }

  return json({})
}
