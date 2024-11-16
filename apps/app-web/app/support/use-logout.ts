import Cookies from 'js-cookie'
import client from '@starter/client'
import { useRouter } from '@starter/use-remix-hooks'

export const useLogout = () => {
  const router = useRouter()

  return () => {
    Cookies.remove('token')
    client.unauthenticate()
    router.push('/')
  }
}
