import client from '@starter/client'
import { useRouter } from '@starter/use-react-router-hooks'
import { useLocalStorage } from '@starter/use-hooks'

export const useAuth = () => {
  const router = useRouter()
  const [_, setAccessToken] = useLocalStorage<string | undefined>('accessToken', undefined)

  const authenticate = (accessToken: string) => {
    client.authenticate(accessToken)
    setAccessToken(accessToken)

    router.push('/')
  }

  const unauthenticate = () => {
    client.unauthenticate()
    setAccessToken(undefined)

    router.push('/sign-in')
  }

  return {
    authenticate,
    unauthenticate,
  }
}
