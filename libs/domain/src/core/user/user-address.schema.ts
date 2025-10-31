import { CustomerAddressSchema, z } from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'

export const UserAddressSchema = z.object({
	addressId: BaseSchema.id('address'),
	...CustomerAddressSchema.shape,
	deleteAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const UserAddressInputSchema = UserAddressSchema.omit({
	addressId: true,
	deleteAt: true,
	createdAt: true,
	updatedAt: true,
})

export type UserAddress = z.infer<typeof UserAddressSchema>
export type UserAddressInput = BaseDomainInput<
	z.infer<typeof UserAddressInputSchema>
>
export type UpdatableUserAddressInput = BaseDomainInput<
	z.infer<typeof UserAddressInputSchema>
>
