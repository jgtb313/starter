import { Auth } from '@/core/auth/support/token'

export type IContext = {
  auth?: Auth
  shouldCheckRecaptcha: boolean
}
