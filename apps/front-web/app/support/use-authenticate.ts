import Cookies from 'js-cookie'
import client from '@starter/client'
import { useRouter } from '@starter/use-remix-hooks'

export const useAuthenticate = () => {
  const router = useRouter()

  return (token: string) => {
    Cookies.set('token', token)
    client.authenticate(token)
    router.push('/')
  }
}
