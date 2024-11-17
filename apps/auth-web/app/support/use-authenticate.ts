import Cookies from 'js-cookie'
import client from '@starter/client'
import { useRouter } from '@starter/use-remix-hooks'

export const useAuthenticate = () => {
  const router = useRouter<{ client_id: string }>()

  return (accessToken: string) => {
    Cookies.set('accessToken', accessToken, {
      domain: '.localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'None',
    })
    client.authenticate(accessToken)

    window.location.href = router.query.client_id
  }
}
