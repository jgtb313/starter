import Cookies from 'js-cookie'
import client from '@starter/client'

export const useAuthenticate = () => {
  return (token: string) => {
    Cookies.set('token', token)
    client.authenticate(token)
  }
}
