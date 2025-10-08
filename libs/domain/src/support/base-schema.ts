import type { PickNotNullable, PickNullable } from '@starter/common'
import { z } from '@starter/schema'

export type BaseSchema<
	T,
	Config extends {
		optional?: (keyof T)[]
		exclude?: (keyof T)[]
	} = {},
> = {
	[Key in keyof PickNullable<
		Omit<
			T,
			| 'createdAt'
			| 'updatedAt'
			| NonNullable<Config['optional']>[number]
			| NonNullable<Config['exclude']>[number]
		>
	>]?: Exclude<T[Key], null> | null
} & {
	[Key in keyof PickNotNullable<
		Omit<
			T,
			| 'createdAt'
			| 'updatedAt'
			| NonNullable<Config['optional']>[number]
			| NonNullable<Config['exclude']>[number]
		>
	>]: T[Key]
} & {
	[Key in NonNullable<Config['optional']>[number]]?: T[Key]
} & (Config extends {
		exclude: (keyof T)[]
	}
		? { [Key in Config['exclude'][number]]?: never }
		: {})

export const ID = (resourceName: string) => {
	return z.uuid().meta({
		description: `Unique identifier for ${resourceName}`,
		example: '96738ebc-7da1-48e2-8685-705c7b9268cb',
	})
}

export const CreatedAt = z.iso.datetime()

export const UpdatedAt = z.iso.datetime()

export const DeletedAt = z.iso.datetime().nullish()

export const BaseSchema = {
	id: ID,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
	deletedAt: DeletedAt,
}
