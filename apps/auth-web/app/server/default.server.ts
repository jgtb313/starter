import { redirect, json, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import client, { StageEnum } from '@starter/client'
import { getClientIdInfos } from '~/support/get-client-id-infos'

export const setupDefaultLayout = async (args: LoaderFunctionArgs) => {
  client.connect(StageEnum.LOCAL)

  const clientIdInfos = getClientIdInfos(args)

  if (clientIdInfos === false) {
    return redirect(config.oauth.fallbackUrl)
  }

  return json({})
}
