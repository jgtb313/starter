import { z } from '@/zod'

const Lat = z
	.string()
	.min(1)
	.meta({
		description: 'Latitude coordinate.',
		examples: [
			'34.052235',
		],
	})

const Lng = z
	.string()
	.min(1)
	.meta({
		description: 'Longitude coordinate.',
		examples: [
			'-118.243683',
		],
	})

export const LocationSchema = z.object({
	lat: Lat,
	lng: Lng,
})
export type Location = z.infer<typeof LocationSchema>
