import { IDatabase } from '@/ports/database'
import { IEncrypt } from '@/ports/encrypt'
import { IJWT } from '@/ports/jwt'
import { IMail } from '@/ports/mail'
import { IStorage } from '@/ports/storage'
import { ISocialAuth } from '@/ports/social-auth'

export type IDependencies = {
  Database: Pick<IDatabase, 'createSession'>
  Repositories: ReturnType<IDatabase['Repositories']>
  Encrypt: IEncrypt
  JWT: IJWT
  Mail: IMail
  Storage: IStorage
  SocialAuth: ISocialAuth
}
