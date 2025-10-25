import { clearSpecialChars, isPhone } from '@starter/common'

import { z } from '@/zod'

export const PhoneSchema = z
	.object({
		iso: z.string().min(1).meta({
			description: 'The ISO 3166-1 country code.',
			example: 'BR',
		}),
		ddi: z.string().min(1).meta({
			description:
				'The international dialing code for the country, prefixed by the plus sign (+).',
			example: '+55',
		}),
		number: z
			.string()
			.min(1)
			.transform((value) =>
				clearSpecialChars(value).replace(/\s+/g, '').trim(),
			),
	})
	.refine((value) => isPhone(value), {
		path: [
			'number',
		],
		params: {
			code: 'phoneInvalid',
		},
	})
export type Phone = z.infer<typeof PhoneSchema>
