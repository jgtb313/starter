import { redirect, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { setupCookie } from '~/support/setup-cookies'

export const loader = async (args: LoaderFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const cookieHeader = await setupCookie(args)

  const { redirectUrl } = clientIdInfos

  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  })
}
