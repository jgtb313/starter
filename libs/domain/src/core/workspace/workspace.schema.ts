import { isNil } from '@starter/common'
import {
	BusinessAddressSchema,
	DocumentExplicitSchema,
	EmailSchema,
	LocaleSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const WorkspaceId = BaseSchema.id('workspace')

const RecurrenceExternalId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Name = z.string().min(1)

const Email = EmailSchema.nullish().transform((value) => value ?? null)

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Document = DocumentExplicitSchema.nullish().transform(
	(value) => value ?? null,
)

const Address = BusinessAddressSchema.nullish().transform(
	(value) => value ?? null,
)

const Logo = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Domain = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Locale = z
	.object({
		defaultLocale: LocaleSchema,
		availableLocales: z.array(LocaleSchema).default([]),
	})
	.nullish()
	.refine(
		(value) => {
			if (isNil(value)) {
				return true
			}

			return value.availableLocales.includes(value.defaultLocale)
		},
		{
			params: {
				code: 'workspace.invalid_default_locale',
			},
			path: [
				'defaultLocale',
			],
		},
	)
	.transform((value) => value ?? null)

const TrialEndsAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => value ?? null)

const Status = z
	.enum([
		'TRIAL',
		'ACTIVE',
		'INACTIVE',
	])
	.default('TRIAL')
export type WorkspaceStatus = z.infer<typeof Status>

export const WorkspaceSchema = z.object({
	workspaceId: WorkspaceId,
	recurrenceExternalId: RecurrenceExternalId,
	name: Name,
	email: Email,
	phone: Phone,
	document: Document,
	address: Address,
	logo: Logo,
	domain: Domain,
	locale: Locale,
	trialEndsAt: TrialEndsAt,
	status: Status,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Workspace = z.infer<typeof WorkspaceSchema>
export type WorkspaceInput = z.input<typeof WorkspaceSchema>
export type BaseWorkspace = BaseSchema<
	Workspace,
	{
		optional: [
			'workspaceId',
		]
	}
>
