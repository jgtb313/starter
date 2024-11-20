import { LoaderFunctionArgs } from '@remix-run/node'
import { isValidClientId, isValidRedirectUrl, StageEnum } from '@starter/config'

export const getClientIdInfos = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const clientId = searchParams.get('client_id')
  const redirectUrl = searchParams.get('redirect_url')

  const validClientId = isValidClientId(clientId)

  if (!validClientId || !redirectUrl) {
    return false
  }

  const validRedirectUrl = isValidRedirectUrl(clientId, StageEnum.LOCAL, redirectUrl)

  if (!validRedirectUrl) {
    return false
  }

  return {
    clientId,
    redirectUrl,
  }
}
