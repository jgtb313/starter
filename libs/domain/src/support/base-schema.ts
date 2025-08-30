import type { PickNotNullable, PickNullable } from '@starter/common'
import { z } from '@starter/schema'

export type BaseSchema<K extends keyof T, T> = {
	[Key in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt' | K>>]?: Exclude<
		T[Key],
		null
	> | null
} & {
	[Key in keyof PickNotNullable<Omit<T, 'createdAt' | 'updatedAt' | K>>]: T[Key]
} & {
	[Key in K]?: T[Key]
}

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
	ID,
	CreatedAt,
	UpdatedAt,
	DeletedAt,
}
