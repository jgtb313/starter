import type { PickNotNullable, PickNullable } from '@starter/common'
import { z } from '@starter/schema'

export type BaseSchema<T> = {
	[Key in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt'>>]?: Exclude<
		T[Key],
		null
	> | null
} & {
	[Key in keyof PickNotNullable<Omit<T, 'createdAt' | 'updatedAt'>>]: T[Key]
}

export const ID = (resourceName: string) => {
	return z.uuid().meta({
		description: `Unique identifier for ${resourceName}`,
		example: '96738ebc-7da1-48e2-8685-705c7b9268cb',
	})
}

export const CreatedAt = z.iso.datetime().transform((value) => new Date(value))

export const UpdatedAt = z.iso.datetime().transform((value) => new Date(value))

export const DeletedAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => (value ? new Date(value) : null))

export const BaseSchema = {
	id: ID,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
	deletedAt: DeletedAt,
}
