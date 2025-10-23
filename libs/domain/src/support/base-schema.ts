import { z } from '@starter/schema'

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
