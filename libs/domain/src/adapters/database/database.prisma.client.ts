import { patchPrismaTx } from '@myfunc/prisma-transactional'
import { type Prisma, PrismaClient } from '@prisma/client'

// import { deepMapDatesToISOString } from '@/support/utilities'

const prismaClient = new PrismaClient()

const prisma = patchPrismaTx(prismaClient).$extends({
	query: {
		$allModels: {
			async $allOperations({ args, query }) {
				const result = await query(args)

				// return deepMapDatesToISOString(result)

				return result
			},
		},
	},
})

export { prisma }
export type { Prisma }
