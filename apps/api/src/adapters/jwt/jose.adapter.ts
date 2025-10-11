import { Injectable, UnauthorizedException } from '@nestjs/common'
import { type JWTPayload, jwtVerify, SignJWT } from 'jose'

import type { IJWTAdapter } from '@/ports/jwt'

@Injectable()
export class JoseAdapter implements IJWTAdapter {
	generate: IJWTAdapter['generate'] = async (value, secret, options) => {
		const secretKey = new TextEncoder().encode(secret)

		const jwt = await new SignJWT(value as JWTPayload)
			.setProtectedHeader({
				alg: 'HS256',
			})
			.setIssuedAt()
			.setExpirationTime(options?.expiresIn || '365d')
			.sign(secretKey)

		return jwt
	}

	decode: IJWTAdapter['decode'] = async <T>(value, secret) => {
		const [token] = value?.split(' ').reverse() ?? []

		const secretKey = new TextEncoder().encode(secret)

		try {
			const { payload } = await jwtVerify(token, secretKey, {
				algorithms: [
					'HS256',
				],
			})

			return payload as T
		} catch (error) {
			throw new UnauthorizedException('Invalid access data.')
		}
	}
}
