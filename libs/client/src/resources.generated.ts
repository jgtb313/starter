// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

import { z } from '@starter/schema'

import { formatFields, WithFields } from '@/support/fields'
import { request } from '@/request'

export const SignInSchema = z.object({ email: z.string().email().min(1), password: z.string().min(1) })
export const SignInSchemaOutput = z.object({ accessToken: z.string() })
export type SignInInput = WithFields<z.infer<typeof SignInSchema>, SignInOutput>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const PasswordLessSchema = z.object({
  email: z.string().email().min(1),
  otpVerification: z.object({ otpId: z.string().uuid().describe('Unique identifier for otp'), code: z.string().min(4).max(4) }),
})
export const PasswordLessSchemaOutput = z.object({ accessToken: z.string() })
export type PasswordLessInput = WithFields<z.infer<typeof PasswordLessSchema>, PasswordLessOutput>
export type PasswordLessOutput = z.infer<typeof PasswordLessSchemaOutput>

export const SocialSignOnSchema = z.object({ context: z.enum(['GOOGLE', 'FACEBOOK']), providerToken: z.string().min(1) })
export const SocialSignOnSchemaOutput = z.object({ accessToken: z.string() })
export type SocialSignOnInput = WithFields<z.infer<typeof SocialSignOnSchema>, SocialSignOnOutput>
export type SocialSignOnOutput = z.infer<typeof SocialSignOnSchemaOutput>

export const SignUpSchema = z.object({ name: z.string().min(1), email: z.string().email().min(1), password: z.string().min(8) })
export const SignUpSchemaOutput = z.object({ accessToken: z.string() })
export type SignUpInput = WithFields<z.infer<typeof SignUpSchema>, SignUpOutput>
export type SignUpOutput = z.infer<typeof SignUpSchemaOutput>

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
  otpVerification: z.object({ otpId: z.string().uuid().describe('Unique identifier for otp'), code: z.string().min(4).max(4) }),
})
export const ForgotPasswordSchemaOutput = z.object({ accessToken: z.string() })
export type ForgotPasswordInput = WithFields<z.infer<typeof ForgotPasswordSchema>, ForgotPasswordOutput>
export type ForgotPasswordOutput = z.infer<typeof ForgotPasswordSchemaOutput>

export const GetPresignedUrlSchema = z.object({ fileName: z.string(), context: z.enum(['USER_AVATAR', 'WORKSPACE_LOGO', 'ORGANIZATION_LOGO']) })
export const GetPresignedUrlSchemaOutput = z.object({ fileName: z.string(), fileNameSigned: z.string() })
export type GetPresignedUrlInput = WithFields<z.infer<typeof GetPresignedUrlSchema>, GetPresignedUrlOutput>
export type GetPresignedUrlOutput = z.infer<typeof GetPresignedUrlSchemaOutput>

export const ListOrganizationsSchema = z.object({
  filter: z.string().nullish(),
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).nullish(),
  offset: z.number().int().default(0),
  limit: z.number().int().default(10),
  workspaceId: z.string().uuid(),
})
export const ListOrganizationsSchemaOutput = z.object({
  values: z.array(
    z.object({
      organizationId: z.string().uuid().describe('Unique identifier for organization'),
      workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
      name: z.string().min(1),
      status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
      deletedAt: z.void().nullable(),
      createdAt: z.void(),
      updatedAt: z.void(),
    }),
  ),
  meta: z.object({ total: z.number().int(), offset: z.number().int(), limit: z.number().int() }),
})
export type ListOrganizationsInput = WithFields<z.infer<typeof ListOrganizationsSchema>, ListOrganizationsOutput>
export type ListOrganizationsOutput = z.infer<typeof ListOrganizationsSchemaOutput>

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  workspaceId: z.string().uuid(),
})
export const CreateOrganizationSchemaOutput = z.object({
  organizationId: z.string().uuid().describe('Unique identifier for organization'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type CreateOrganizationInput = WithFields<z.infer<typeof CreateOrganizationSchema>, CreateOrganizationOutput>
export type CreateOrganizationOutput = z.infer<typeof CreateOrganizationSchemaOutput>

export const GetOrganizationSchema = z.object({ workspaceId: z.string().uuid(), organizationId: z.string().uuid() })
export const GetOrganizationSchemaOutput = z.object({
  organizationId: z.string().uuid().describe('Unique identifier for organization'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type GetOrganizationInput = WithFields<z.infer<typeof GetOrganizationSchema>, GetOrganizationOutput>
export type GetOrganizationOutput = z.infer<typeof GetOrganizationSchemaOutput>

export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  workspaceId: z.string().uuid(),
  organizationId: z.string().uuid(),
})
export const UpdateOrganizationSchemaOutput = z.object({
  organizationId: z.string().uuid().describe('Unique identifier for organization'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateOrganizationInput = WithFields<z.infer<typeof UpdateOrganizationSchema>, UpdateOrganizationOutput>
export type UpdateOrganizationOutput = z.infer<typeof UpdateOrganizationSchemaOutput>

export const DeleteOrganizationSchema = z.object({ workspaceId: z.string().uuid(), organizationId: z.string().uuid() })
export const DeleteOrganizationSchemaOutput = z.void()
export type DeleteOrganizationInput = WithFields<z.infer<typeof DeleteOrganizationSchema>, DeleteOrganizationOutput>
export type DeleteOrganizationOutput = z.infer<typeof DeleteOrganizationSchemaOutput>

export const ValidateOTPSchema = z.object({
  context: z.enum(['PASSWORD_LESS', 'FORGOT_PASSWORD', 'UPDATE_EMAIL', 'UPDATE_PHONE']),
  recipient: z.string().min(1),
  code: z.string().min(1),
  otpId: z.string().uuid(),
})
export const ValidateOTPSchemaOutput = z.void()
export type ValidateOTPInput = WithFields<z.infer<typeof ValidateOTPSchema>, ValidateOTPOutput>
export type ValidateOTPOutput = z.infer<typeof ValidateOTPSchemaOutput>

export const SendPasswordLessOTPSchema = z.object({ email: z.string().email().min(1) })
export const SendPasswordLessOTPSchemaOutput = z.object({ otpId: z.string().uuid().describe('Unique identifier for otp') })
export type SendPasswordLessOTPInput = WithFields<z.infer<typeof SendPasswordLessOTPSchema>, SendPasswordLessOTPOutput>
export type SendPasswordLessOTPOutput = z.infer<typeof SendPasswordLessOTPSchemaOutput>

export const SendForgotPasswordOTPSchema = z.object({ email: z.string().email().min(1) })
export const SendForgotPasswordOTPSchemaOutput = z.object({ otpId: z.string().uuid().describe('Unique identifier for otp') })
export type SendForgotPasswordOTPInput = WithFields<z.infer<typeof SendForgotPasswordOTPSchema>, SendForgotPasswordOTPOutput>
export type SendForgotPasswordOTPOutput = z.infer<typeof SendForgotPasswordOTPSchemaOutput>

export const SendUpdateEmailOTPSchema = z.object({ email: z.string().email().min(1) })
export const SendUpdateEmailOTPSchemaOutput = z.object({ otpId: z.string().uuid().describe('Unique identifier for otp') })
export type SendUpdateEmailOTPInput = WithFields<z.infer<typeof SendUpdateEmailOTPSchema>, SendUpdateEmailOTPOutput>
export type SendUpdateEmailOTPOutput = z.infer<typeof SendUpdateEmailOTPSchemaOutput>

export const SendUpdatePhoneOTPSchema = z.object({
  channel: z.enum(['SMS', 'WHATSAPP']),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }),
})
export const SendUpdatePhoneOTPSchemaOutput = z.object({ otpId: z.string().uuid().describe('Unique identifier for otp') })
export type SendUpdatePhoneOTPInput = WithFields<z.infer<typeof SendUpdatePhoneOTPSchema>, SendUpdatePhoneOTPOutput>
export type SendUpdatePhoneOTPOutput = z.infer<typeof SendUpdatePhoneOTPSchemaOutput>

export const GetPermissionsSchema = z.object({})
export const GetPermissionsSchemaOutput = z.array(z.string())
export type GetPermissionsInput = WithFields<z.infer<typeof GetPermissionsSchema>, GetPermissionsOutput>
export type GetPermissionsOutput = z.infer<typeof GetPermissionsSchemaOutput>

export const ListPlansSchema = z.object({ offset: z.number().int().default(0), limit: z.number().int().default(10) })
export const ListPlansSchemaOutput = z.object({
  values: z.array(
    z.object({
      planId: z.string().uuid().describe('Unique identifier for plan'),
      externalId: z.string().min(1),
      name: z.string().min(1),
      description: z.string().min(1),
      amount: z.number().gt(0),
      interval: z.enum(['DAY', 'WEEK', 'MONTH', 'YEAR']),
      intervalCount: z.number().default(1),
      trialDays: z.number(),
      features: z
        .array(
          z.object({
            description: z.string().min(1),
            code: z.literal('ORGANIZATION_COUNT'),
            props: z.object({ maxOrganizations: z.number().gte(1) }),
          }),
        )
        .default([]),
      highlight: z.boolean().default(false),
      status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
      deletedAt: z.void().nullable(),
      createdAt: z.void(),
      updatedAt: z.void(),
    }),
  ),
  meta: z.object({ total: z.number().int(), offset: z.number().int(), limit: z.number().int() }),
})
export type ListPlansInput = WithFields<z.infer<typeof ListPlansSchema>, ListPlansOutput>
export type ListPlansOutput = z.infer<typeof ListPlansSchemaOutput>

export const GetProfileSchema = z.object({})
export const GetProfileSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type GetProfileInput = WithFields<z.infer<typeof GetProfileSchema>, GetProfileOutput>
export type GetProfileOutput = z.infer<typeof GetProfileSchemaOutput>

export const UpdateProfileSchema = z.object({ name: z.string().min(1).nullish(), avatar: z.string().nullable().nullish() })
export const UpdateProfileSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateProfileInput = WithFields<z.infer<typeof UpdateProfileSchema>, UpdateProfileOutput>
export type UpdateProfileOutput = z.infer<typeof UpdateProfileSchemaOutput>

export const DeactivateProfileSchema = z.object({})
export const DeactivateProfileSchemaOutput = z.void()
export type DeactivateProfileInput = WithFields<z.infer<typeof DeactivateProfileSchema>, DeactivateProfileOutput>
export type DeactivateProfileOutput = z.infer<typeof DeactivateProfileSchemaOutput>

export const UpdateProfileEmailSchema = z.object({
  email: z.string().email().min(1),
  otpVerification: z.object({ otpId: z.string().uuid().describe('Unique identifier for otp'), code: z.string().min(4).max(4) }),
})
export const UpdateProfileEmailSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateProfileEmailInput = WithFields<z.infer<typeof UpdateProfileEmailSchema>, UpdateProfileEmailOutput>
export type UpdateProfileEmailOutput = z.infer<typeof UpdateProfileEmailSchemaOutput>

export const UpdateProfilePhoneSchema = z.object({
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }),
  otpVerification: z.object({ otpId: z.string().uuid().describe('Unique identifier for otp'), code: z.string().min(4).max(4) }),
})
export const UpdateProfilePhoneSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateProfilePhoneInput = WithFields<z.infer<typeof UpdateProfilePhoneSchema>, UpdateProfilePhoneOutput>
export type UpdateProfilePhoneOutput = z.infer<typeof UpdateProfilePhoneSchemaOutput>

export const UpdateProfilePasswordSchema = z.object({ password: z.string().min(8), currentPassword: z.string().min(1) })
export const UpdateProfilePasswordSchemaOutput = z.void()
export type UpdateProfilePasswordInput = WithFields<z.infer<typeof UpdateProfilePasswordSchema>, UpdateProfilePasswordOutput>
export type UpdateProfilePasswordOutput = z.infer<typeof UpdateProfilePasswordSchemaOutput>

export const ListRolesSchema = z.object({
  filter: z.string().nullish(),
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).nullish(),
  offset: z.number().int().default(0),
  limit: z.number().int().default(10),
  workspaceId: z.string().uuid(),
})
export const ListRolesSchemaOutput = z.object({
  values: z.array(
    z.object({
      roleId: z.string().uuid().describe('Unique identifier for role'),
      workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
      organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
      organizations: z
        .array(
          z.object({
            organizationId: z.string().uuid().describe('Unique identifier for organization'),
            workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
            name: z.string().min(1),
            status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
            deletedAt: z.void().nullable(),
            createdAt: z.void(),
            updatedAt: z.void(),
          }),
        )
        .default([]),
      name: z.string().min(1),
      permissions: z.array(z.string()),
      tags: z.array(z.string()).nullable(),
      status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
      deletedAt: z.void().nullable(),
      createdAt: z.void(),
      updatedAt: z.void(),
    }),
  ),
  meta: z.object({ total: z.number().int(), offset: z.number().int(), limit: z.number().int() }),
})
export type ListRolesInput = WithFields<z.infer<typeof ListRolesSchema>, ListRolesOutput>
export type ListRolesOutput = z.infer<typeof ListRolesSchemaOutput>

export const CreateRoleSchema = z.object({
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  name: z.string().min(1),
  tags: z.array(z.string()).nullable(),
  permissions: z.array(z.string()),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  workspaceId: z.string().uuid(),
})
export const CreateRoleSchemaOutput = z.object({
  roleId: z.string().uuid().describe('Unique identifier for role'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  name: z.string().min(1),
  permissions: z.array(z.string()),
  tags: z.array(z.string()).nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type CreateRoleInput = WithFields<z.infer<typeof CreateRoleSchema>, CreateRoleOutput>
export type CreateRoleOutput = z.infer<typeof CreateRoleSchemaOutput>

export const GetRoleSchema = z.object({ workspaceId: z.string().uuid(), roleId: z.string().uuid() })
export const GetRoleSchemaOutput = z.object({
  roleId: z.string().uuid().describe('Unique identifier for role'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  name: z.string().min(1),
  permissions: z.array(z.string()),
  tags: z.array(z.string()).nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type GetRoleInput = WithFields<z.infer<typeof GetRoleSchema>, GetRoleOutput>
export type GetRoleOutput = z.infer<typeof GetRoleSchemaOutput>

export const UpdateRoleSchema = z.object({
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')).nullish(),
  name: z.string().min(1).nullish(),
  tags: z.array(z.string()).nullable().nullish(),
  permissions: z.array(z.string()).nullish(),
  workspaceId: z.string().uuid(),
  roleId: z.string().uuid(),
})
export const UpdateRoleSchemaOutput = z.object({
  roleId: z.string().uuid().describe('Unique identifier for role'),
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  name: z.string().min(1),
  permissions: z.array(z.string()),
  tags: z.array(z.string()).nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  deletedAt: z.void().nullable(),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateRoleInput = WithFields<z.infer<typeof UpdateRoleSchema>, UpdateRoleOutput>
export type UpdateRoleOutput = z.infer<typeof UpdateRoleSchemaOutput>

export const DeleteRoleSchema = z.object({ workspaceId: z.string().uuid(), roleId: z.string().uuid() })
export const DeleteRoleSchemaOutput = z.void()
export type DeleteRoleInput = WithFields<z.infer<typeof DeleteRoleSchema>, DeleteRoleOutput>
export type DeleteRoleOutput = z.infer<typeof DeleteRoleSchemaOutput>

export const ExampleSchema = z.object({ offset: z.number().int().default(0), limit: z.number().int().default(10) })
export const ExampleSchemaOutput = z.object({
  values: z.array(
    z.void().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          subscriptionId: z.string().uuid().describe('Unique identifier for subscription'),
          workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
          planId: z.string().uuid().describe('Unique identifier for plan'),
          externalId: z.string().min(1),
          amount: z.number().gte(1),
          paymentMethod: z.literal('CREDIT_CARD'),
          creditCard: z.object({
            number: z.string().min(1),
            holderName: z.string().min(1),
            expirationDate: z.string().min(5).max(5),
            cvv: z.string().min(3).max(4),
          }),
          deadline: z.void(),
          billingDueDate: z.void(),
          canceledAt: z.void().nullable(),
          payer: z.object({
            name: z.string().min(1),
            email: z.string().email().min(1),
            phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }),
            document: z.object({ number: z.string().min(1), type: z.enum(['INDIVIDUAL', 'COMPANY']) }),
            address: z.object({
              id: z.string().min(1),
              state: z.string().min(1),
              city: z.string().min(1),
              zipCode: z.string().min(1),
              neighborhood: z.string().min(1),
              street: z.string().min(1),
              number: z.string().min(1),
              complement: z.string().nullable(),
            }),
          }),
          status: z.enum(['TRIAL', 'ACTIVE', 'OVERDUE', 'CANCELED']).default('ACTIVE'),
          createdAt: z.void(),
          updatedAt: z.void(),
        }),
        z.object({
          subscriptionId: z.string().uuid().describe('Unique identifier for subscription'),
          workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
          planId: z.string().uuid().describe('Unique identifier for plan'),
          externalId: z.string().min(1),
          amount: z.number().gte(1),
          paymentMethod: z.literal('DEBIT_CARD'),
          debitCard: z.object({
            number: z.string().min(1),
            holderName: z.string().min(1),
            expirationDate: z.string().min(5).max(5),
            cvv: z.string().min(3).max(4),
          }),
          deadline: z.void(),
          billingDueDate: z.void(),
          canceledAt: z.void().nullable(),
          payer: z.object({
            name: z.string().min(1),
            email: z.string().email().min(1),
            phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }),
            document: z.object({ number: z.string().min(1), type: z.enum(['INDIVIDUAL', 'COMPANY']) }),
            address: z.object({
              id: z.string().min(1),
              state: z.string().min(1),
              city: z.string().min(1),
              zipCode: z.string().min(1),
              neighborhood: z.string().min(1),
              street: z.string().min(1),
              number: z.string().min(1),
              complement: z.string().nullable(),
            }),
          }),
          status: z.enum(['TRIAL', 'ACTIVE', 'OVERDUE', 'CANCELED']).default('ACTIVE'),
          createdAt: z.void(),
          updatedAt: z.void(),
        }),
      ]
      const errors = schemas.reduce<z.ZodError[]>(
        (errors, schema) => ((result) => (result.error ? [...errors, result.error] : errors))(schema.safeParse(x)),
        [],
      )
      if (schemas.length - errors.length !== 1) {
        ctx.addIssue({
          path: ctx.path,
          code: 'invalid_union',
          unionErrors: errors,
          message: 'Invalid input: Should pass single schema',
        })
      }
    }),
  ),
  meta: z.object({ total: z.number().int(), offset: z.number().int(), limit: z.number().int() }),
})
export type ExampleInput = WithFields<z.infer<typeof ExampleSchema>, ExampleOutput>
export type ExampleOutput = z.infer<typeof ExampleSchemaOutput>

export const ListUsersSchema = z.object({
  filter: z.string().nullish(),
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).nullish(),
  offset: z.number().int().default(0),
  limit: z.number().int().default(10),
  workspaceId: z.string().uuid(),
})
export const ListUsersSchemaOutput = z.object({
  values: z.array(
    z.object({
      userId: z.string().uuid().describe('Unique identifier for user'),
      workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
      organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
      organizations: z
        .array(
          z.object({
            organizationId: z.string().uuid().describe('Unique identifier for organization'),
            workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
            name: z.string().min(1),
            status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
            deletedAt: z.void().nullable(),
            createdAt: z.void(),
            updatedAt: z.void(),
          }),
        )
        .default([]),
      roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
      roles: z
        .array(
          z.object({
            roleId: z.string().uuid().describe('Unique identifier for role'),
            workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
            organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
            organizations: z
              .array(
                z.object({
                  organizationId: z.string().uuid().describe('Unique identifier for organization'),
                  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
                  name: z.string().min(1),
                  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
                  deletedAt: z.void().nullable(),
                  createdAt: z.void(),
                  updatedAt: z.void(),
                }),
              )
              .default([]),
            name: z.string().min(1),
            permissions: z.array(z.string()),
            tags: z.array(z.string()).nullable(),
            status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
            deletedAt: z.void().nullable(),
            createdAt: z.void(),
            updatedAt: z.void(),
          }),
        )
        .default([]),
      permissions: z.array(z.string()),
      name: z.string().min(1),
      email: z.string().email().min(1),
      phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
      avatar: z.string().nullable(),
      social: z
        .object({ googleId: z.string().nullable(), facebookId: z.string().nullable() })
        .nullable()
        .default({ googleId: null, facebookId: null }),
      password: z.string().min(8),
      status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
      createdAt: z.void(),
      updatedAt: z.void(),
    }),
  ),
  meta: z.object({ total: z.number().int(), offset: z.number().int(), limit: z.number().int() }),
})
export type ListUsersInput = WithFields<z.infer<typeof ListUsersSchema>, ListUsersOutput>
export type ListUsersOutput = z.infer<typeof ListUsersSchemaOutput>

export const CreateUserSchema = z.object({
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  password: z.string().min(8),
  organizations: z.array(
    z.object({
      organizationId: z.string().uuid().describe('Unique identifier for organization'),
      roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
    }),
  ),
  workspaceId: z.string().uuid(),
})
export const CreateUserSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  password: z.string().min(8),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type CreateUserInput = WithFields<z.infer<typeof CreateUserSchema>, CreateUserOutput>
export type CreateUserOutput = z.infer<typeof CreateUserSchemaOutput>

export const GetUserSchema = z.object({ userId: z.string().uuid(), workspaceId: z.string().uuid() })
export const GetUserSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  password: z.string().min(8),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type GetUserInput = WithFields<z.infer<typeof GetUserSchema>, GetUserOutput>
export type GetUserOutput = z.infer<typeof GetUserSchemaOutput>

export const UpdateUserSchema = z.object({
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
      }),
    )
    .nullish(),
  userId: z.string().uuid(),
  workspaceId: z.string().uuid(),
})
export const UpdateUserSchemaOutput = z.object({
  userId: z.string().uuid().describe('Unique identifier for user'),
  workspaceId: z.string().uuid().nullable().describe('Unique identifier for workspaceId').nullish(),
  organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
  organizations: z
    .array(
      z.object({
        organizationId: z.string().uuid().describe('Unique identifier for organization'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        name: z.string().min(1),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  roleIds: z.array(z.string().uuid().describe('Unique identifier for role')),
  roles: z
    .array(
      z.object({
        roleId: z.string().uuid().describe('Unique identifier for role'),
        workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
        organizationIds: z.array(z.string().uuid().describe('Unique identifier for organization')),
        organizations: z
          .array(
            z.object({
              organizationId: z.string().uuid().describe('Unique identifier for organization'),
              workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
              name: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
              deletedAt: z.void().nullable(),
              createdAt: z.void(),
              updatedAt: z.void(),
            }),
          )
          .default([]),
        name: z.string().min(1),
        permissions: z.array(z.string()),
        tags: z.array(z.string()).nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
        deletedAt: z.void().nullable(),
        createdAt: z.void(),
        updatedAt: z.void(),
      }),
    )
    .default([]),
  permissions: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.object({ iso: z.string().min(1), ddi: z.string().min(1), number: z.string().min(1) }).nullable(),
  avatar: z.string().nullable(),
  social: z.object({ googleId: z.string().nullable(), facebookId: z.string().nullable() }).nullable().default({ googleId: null, facebookId: null }),
  password: z.string().min(8),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateUserInput = WithFields<z.infer<typeof UpdateUserSchema>, UpdateUserOutput>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const GetWorkspaceSchema = z.object({ workspaceId: z.string().uuid() })
export const GetWorkspaceSchemaOutput = z.object({
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type GetWorkspaceInput = WithFields<z.infer<typeof GetWorkspaceSchema>, GetWorkspaceOutput>
export type GetWorkspaceOutput = z.infer<typeof GetWorkspaceSchemaOutput>

export const UpdateWorkspaceSchema = z.object({
  name: z.string().min(1).nullish(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  workspaceId: z.string().uuid(),
})
export const UpdateWorkspaceSchemaOutput = z.object({
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type UpdateWorkspaceInput = WithFields<z.infer<typeof UpdateWorkspaceSchema>, UpdateWorkspaceOutput>
export type UpdateWorkspaceOutput = z.infer<typeof UpdateWorkspaceSchemaOutput>

export const CreateWorkspaceSchema = z.object({ name: z.string().min(1) })
export const CreateWorkspaceSchemaOutput = z.object({
  workspaceId: z.string().uuid().describe('Unique identifier for workspace'),
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  createdAt: z.void(),
  updatedAt: z.void(),
})
export type CreateWorkspaceInput = WithFields<z.infer<typeof CreateWorkspaceSchema>, CreateWorkspaceOutput>
export type CreateWorkspaceOutput = z.infer<typeof CreateWorkspaceSchemaOutput>

export const signIn = ({ fields, ...input }: SignInInput): Promise<SignInOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/auth/sign-in`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SignInSchemaOutput.parse)
}
export const passwordLess = ({ fields, ...input }: PasswordLessInput): Promise<PasswordLessOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/auth/password-less`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(PasswordLessSchemaOutput.parse)
}
export const socialSignOn = ({ fields, ...input }: SocialSignOnInput): Promise<SocialSignOnOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/auth/social-sign-on`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SocialSignOnSchemaOutput.parse)
}
export const signUp = ({ fields, ...input }: SignUpInput): Promise<SignUpOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/auth/sign-up`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SignUpSchemaOutput.parse)
}
export const forgotPassword = ({ fields, ...input }: ForgotPasswordInput): Promise<ForgotPasswordOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/auth/forgot-password`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(ForgotPasswordSchemaOutput.parse)
}
export const getPresignedUrl = ({ fields, ...input }: GetPresignedUrlInput): Promise<GetPresignedUrlOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/storage/files`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(GetPresignedUrlSchemaOutput.parse)
}
export const listOrganizations = ({ fields, ...input }: ListOrganizationsInput): Promise<ListOrganizationsOutput> => {
  const { workspaceId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/organizations`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(ListOrganizationsSchemaOutput.parse)
}
export const createOrganization = ({ fields, ...input }: CreateOrganizationInput): Promise<CreateOrganizationOutput> => {
  const { workspaceId, ...body } = input

  return request
    .post(`/v1/workspaces/${workspaceId}/organizations`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(CreateOrganizationSchemaOutput.parse)
}
export const getOrganization = ({ fields, ...input }: GetOrganizationInput): Promise<GetOrganizationOutput> => {
  const { workspaceId, organizationId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetOrganizationSchemaOutput.parse)
}
export const updateOrganization = ({ fields, ...input }: UpdateOrganizationInput): Promise<UpdateOrganizationOutput> => {
  const { workspaceId, organizationId, ...body } = input

  return request
    .patch(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateOrganizationSchemaOutput.parse)
}
export const deleteOrganization = ({ fields, ...input }: DeleteOrganizationInput): Promise<DeleteOrganizationOutput> => {
  const { workspaceId, organizationId, ...query } = input

  return request
    .delete(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(DeleteOrganizationSchemaOutput.parse)
}
export const validateOTP = ({ fields, ...input }: ValidateOTPInput): Promise<ValidateOTPOutput> => {
  const { otpId, ...body } = input

  return request
    .post(`/v1/otps/${otpId}/validate`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(ValidateOTPSchemaOutput.parse)
}
export const sendPasswordLessOTP = ({ fields, ...input }: SendPasswordLessOTPInput): Promise<SendPasswordLessOTPOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/otps/password-less`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SendPasswordLessOTPSchemaOutput.parse)
}
export const sendForgotPasswordOTP = ({ fields, ...input }: SendForgotPasswordOTPInput): Promise<SendForgotPasswordOTPOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/otps/forgot-password`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SendForgotPasswordOTPSchemaOutput.parse)
}
export const sendUpdateEmailOTP = ({ fields, ...input }: SendUpdateEmailOTPInput): Promise<SendUpdateEmailOTPOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/otps/update-email`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SendUpdateEmailOTPSchemaOutput.parse)
}
export const sendUpdatePhoneOTP = ({ fields, ...input }: SendUpdatePhoneOTPInput): Promise<SendUpdatePhoneOTPOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/otps/update-phone`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(SendUpdatePhoneOTPSchemaOutput.parse)
}
export const getPermissions = ({ fields, ...input }: GetPermissionsInput): Promise<GetPermissionsOutput> => {
  const { ...query } = input

  return request
    .get(`/v1/permissions`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetPermissionsSchemaOutput.parse)
}
export const listPlans = ({ fields, ...input }: ListPlansInput): Promise<ListPlansOutput> => {
  const { ...query } = input

  return request
    .get(`/v1/plans`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(ListPlansSchemaOutput.parse)
}
export const getProfile = ({ fields, ...input }: GetProfileInput): Promise<GetProfileOutput> => {
  const { ...query } = input

  return request
    .get(`/v1/profile`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetProfileSchemaOutput.parse)
}
export const updateProfile = ({ fields, ...input }: UpdateProfileInput): Promise<UpdateProfileOutput> => {
  const { ...body } = input

  return request
    .patch(`/v1/profile`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateProfileSchemaOutput.parse)
}
export const deactivateProfile = ({ fields, ...input }: DeactivateProfileInput): Promise<DeactivateProfileOutput> => {
  const { ...query } = input

  return request
    .delete(`/v1/profile`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(DeactivateProfileSchemaOutput.parse)
}
export const updateProfileEmail = ({ fields, ...input }: UpdateProfileEmailInput): Promise<UpdateProfileEmailOutput> => {
  const { ...body } = input

  return request
    .patch(`/v1/profile/email`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateProfileEmailSchemaOutput.parse)
}
export const updateProfilePhone = ({ fields, ...input }: UpdateProfilePhoneInput): Promise<UpdateProfilePhoneOutput> => {
  const { ...body } = input

  return request
    .patch(`/v1/profile/phone`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateProfilePhoneSchemaOutput.parse)
}
export const updateProfilePassword = ({ fields, ...input }: UpdateProfilePasswordInput): Promise<UpdateProfilePasswordOutput> => {
  const { ...body } = input

  return request
    .patch(`/v1/profile/password`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateProfilePasswordSchemaOutput.parse)
}
export const listRoles = ({ fields, ...input }: ListRolesInput): Promise<ListRolesOutput> => {
  const { workspaceId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/roles`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(ListRolesSchemaOutput.parse)
}
export const createRole = ({ fields, ...input }: CreateRoleInput): Promise<CreateRoleOutput> => {
  const { workspaceId, ...body } = input

  return request
    .post(`/v1/workspaces/${workspaceId}/roles`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(CreateRoleSchemaOutput.parse)
}
export const getRole = ({ fields, ...input }: GetRoleInput): Promise<GetRoleOutput> => {
  const { workspaceId, roleId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/roles/${roleId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetRoleSchemaOutput.parse)
}
export const updateRole = ({ fields, ...input }: UpdateRoleInput): Promise<UpdateRoleOutput> => {
  const { workspaceId, roleId, ...body } = input

  return request
    .patch(`/v1/workspaces/${workspaceId}/roles/${roleId}`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateRoleSchemaOutput.parse)
}
export const deleteRole = ({ fields, ...input }: DeleteRoleInput): Promise<DeleteRoleOutput> => {
  const { workspaceId, roleId, ...query } = input

  return request
    .delete(`/v1/workspaces/${workspaceId}/roles/${roleId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(DeleteRoleSchemaOutput.parse)
}
export const example = ({ fields, ...input }: ExampleInput): Promise<ExampleOutput> => {
  const { ...query } = input

  return request
    .get(`/v1/subscriptions`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(ExampleSchemaOutput.parse)
}
export const listUsers = ({ fields, ...input }: ListUsersInput): Promise<ListUsersOutput> => {
  const { workspaceId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/users`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(ListUsersSchemaOutput.parse)
}
export const createUser = ({ fields, ...input }: CreateUserInput): Promise<CreateUserOutput> => {
  const { workspaceId, ...body } = input

  return request
    .post(`/v1/workspaces/${workspaceId}/users`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(CreateUserSchemaOutput.parse)
}
export const getUser = ({ fields, ...input }: GetUserInput): Promise<GetUserOutput> => {
  const { userId, workspaceId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}/users/${userId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetUserSchemaOutput.parse)
}
export const updateUser = ({ fields, ...input }: UpdateUserInput): Promise<UpdateUserOutput> => {
  const { userId, workspaceId, ...body } = input

  return request
    .patch(`/v1/workspaces/${workspaceId}/users/${userId}`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateUserSchemaOutput.parse)
}
export const getWorkspace = ({ fields, ...input }: GetWorkspaceInput): Promise<GetWorkspaceOutput> => {
  const { workspaceId, ...query } = input

  return request
    .get(`/v1/workspaces/${workspaceId}`, {
      params: {
        fields: formatFields(fields),
        ...query,
      },
    })
    .then(GetWorkspaceSchemaOutput.parse)
}
export const updateWorkspace = ({ fields, ...input }: UpdateWorkspaceInput): Promise<UpdateWorkspaceOutput> => {
  const { workspaceId, ...body } = input

  return request
    .patch(`/v1/workspaces/${workspaceId}`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(UpdateWorkspaceSchemaOutput.parse)
}
export const createWorkspace = ({ fields, ...input }: CreateWorkspaceInput): Promise<CreateWorkspaceOutput> => {
  const { ...body } = input

  return request
    .post(`/v1/workspaces`, body, {
      params: {
        fields: formatFields(fields),
      },
    })
    .then(CreateWorkspaceSchemaOutput.parse)
}
