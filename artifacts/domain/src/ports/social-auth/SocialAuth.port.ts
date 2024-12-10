import { SocialSignInEnum } from '@starter/schema'

export type SocialAuthOutput = { id: string; name: string; email?: string }

export type ISocialAuth = {
  getInfosByToken(strategy: SocialSignInEnum, token: string): Promise<SocialAuthOutput>
}
