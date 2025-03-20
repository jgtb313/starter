import { Injectable, UnauthorizedException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

import { ISocialAuthStrategy } from '@/ports/social-auth'

type FacebookUserInfo = {
  id: string
  first_name: string
  last_name: string | null
  email?: string
  picture: { data: { url: string } }
}

@Injectable()
export class FacebookOauth2Strategy implements ISocialAuthStrategy {
  constructor(private readonly httpService: HttpService) {}

  private readonly facebookUserInfoUrl = 'https://graph.facebook.com/v14.0/me'

  getInfo: ISocialAuthStrategy['getInfo'] = async (providerToken) => {
    try {
      const fields = ['id', 'first_name', 'last_name', 'email', 'picture.type(large)'].join(',')

      const response = await lastValueFrom(
        this.httpService.get<FacebookUserInfo>(`${this.facebookUserInfoUrl}?fields=${fields}`, {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }),
      )

      return {
        providerId: response.data.id,
        name: response.data.last_name ? response.data.first_name : `${response.data.first_name} ${response.data.last_name}`,
        email: response.data.email ?? null,
        avatar: response.data.picture?.data?.url ?? null,
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid access data.')
    }
  }
}
