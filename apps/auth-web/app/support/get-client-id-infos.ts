import { LoaderFunctionArgs } from '@remix-run/node'
import { isValidClientId, isValidRedirectUri, StageEnum } from '@starter/config'

export const getClientIdInfos = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const clientId = searchParams.get('client_id')
  const redirectUrl = searchParams.get('redirect_url')

  const validClientId = isValidClientId(clientId)

  if (!validClientId || !redirectUrl) {
    return false
  }

  const validRedirectUrl = isValidRedirectUri(clientId, StageEnum.LOCAL, redirectUrl)

  if (!validRedirectUrl) {
    return false
  }

  return {
    clientId,
    redirectUrl,
  }
}
