import { json, redirect, LoaderFunctionArgs } from '@remix-run/node'

export const setupDefaultLayout = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const clientId = searchParams.get('client_id')

  if (!clientId) {
    return redirect('https://www.google.com')
  }

  return json({})
}
