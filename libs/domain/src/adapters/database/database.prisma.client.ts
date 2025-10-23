import { type Prisma, PrismaClient } from '@prisma/client'

import { deepMapDatesToISOString } from '@/support/utilities'

const prisma = new PrismaClient().$extends({
	query: {
		$allModels: {
			async $allOperations({ args, query }) {
				const result = await query(args)

				return deepMapDatesToISOString(result)
			},
		},
	},
})

export { prisma }
export type { Prisma }
