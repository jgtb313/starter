import { SocialAuthEnum } from '@starter/schema'

export type SocialAuthOutput = { id: string; name: string; email?: string }

export type ISocialAuth = {
  getInfosByToken(strategy: SocialAuthEnum, token: string): Promise<SocialAuthOutput>
}
