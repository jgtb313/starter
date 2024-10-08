import { Auth } from '@/support/auth'

export type IContext = {
  auth?: Auth
  shouldCheckRecaptcha: boolean
}
