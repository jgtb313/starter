import { Inject, Injectable } from '@nestjs/common'

import type { IJWT } from '@/ports/jwt'

@Injectable()
export class JWTService {
	constructor(@Inject('JWT') private readonly jwt: IJWT) {}

	generate: IJWT['generate'] = async (value, secret, options) => {
		return this.jwt.generate(value, secret, options)
	}

	decode: IJWT['decode'] = async (value, secret) => {
		return this.jwt.decode(value, secret)
	}
}
