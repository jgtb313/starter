import { User } from '@starter/domain'

import { SocialAuthEnum } from '@/ports/social-auth'

export type SignInInput = {
  email: string
  password: string
}

export type SignUpInput = {
  name: string
  email: string
  password: string
}

export type ForgotPasswordInput = {
  email: string
  password: string
}

export type SocialSignOnInput = {
  context: SocialAuthEnum
  providerToken: string
}

export interface IAuthService {
  signIn(input: SignInInput): Promise<{ accessToken: string }>
  signUp(input: SignUpInput): Promise<{ accessToken: string }>
  forgotPassword(input: ForgotPasswordInput): Promise<{ accessToken: string }>
  socialSignOn(input: SocialSignOnInput): Promise<{ accessToken: string }>
  grantAccessToken(user: User): Promise<{ accessToken: string }>
}
