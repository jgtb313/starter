export const authentication = async (request: Request, next: () => void) => {
  const [url] = request.url.split('/').reverse()

  const publicRoutes = ['sign-in']
  const isPublicRoute = publicRoutes.some((publicRoute) => url.startsWith(publicRoute))

  const isLogged = !!window.localStorage.getItem('accessToken')

  if (isLogged) {
    if (isPublicRoute) {
      window.location.href = '/'
      return
    }

    await next()
    return
  }

  if (!isLogged) {
    if (isPublicRoute) {
      await next()
      return
    }

    window.location.href = '/sign-in'
    return
  }

  await next()
}
