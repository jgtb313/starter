import { Injectable, UnauthorizedException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

import { ISocialAuthStrategy } from '@/ports/social-auth'

type GoogleUserInfo = {
  id: string
  given_name: string
  family_name: string | null
  email: string
  picture: string
}

@Injectable()
export class GoogleOauth2Strategy implements ISocialAuthStrategy {
  constructor(private readonly httpService: HttpService) {}

  private readonly googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'

  getInfo: ISocialAuthStrategy['getInfo'] = async (providerToken) => {
    try {
      const response = await lastValueFrom(
        this.httpService.get<GoogleUserInfo>(this.googleUserInfoUrl, {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }),
      )

      return {
        providerId: response.data.id,
        name: response.data.family_name ? response.data.given_name : `${response.data.given_name} ${response.data.family_name}`,
        email: response.data.email,
        avatar: response.data.picture,
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid access data.')
    }
  }
}
