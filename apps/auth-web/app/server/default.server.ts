import { redirect, json, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import { getClientIdInfos } from '~/support/get-client-id-infos'

export const setupDefaultLayout = async (args: LoaderFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (clientIdInfos === false) {
    return redirect(config.oauth.fallbackUrl)
  }

  return json({})
}
