import { z } from '@starter/schema'

const ID = (resourceName: string) => {
	return z.uuid().meta({
		description: `Unique identifier for ${resourceName}`,
		example: '96738ebc-7da1-48e2-8685-705c7b9268cb',
	})
}

const CreatedAt = z.iso.datetime().transform((value) => new Date(value))

const UpdatedAt = z.iso.datetime().transform((value) => new Date(value))

const DeletedAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => (value ? new Date(value) : null))

export const BaseSchema = {
	id: ID,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
	deletedAt: DeletedAt,
}
