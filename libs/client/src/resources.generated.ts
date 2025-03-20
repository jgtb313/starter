// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

import { z } from '@starter/schema'

import { formatFields, WithFields } from '@/support/fields'
import { request } from '@/request'

export const OrganizationSchema = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type Organization = z.infer<typeof OrganizationSchema>
export const OTPSchema = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "userId": z.union([z.string().uuid().describe("Unique identifier for user"), z.null().describe("Unique identifier for user")]).describe("Unique identifier for user").nullish(), "channel": z.enum(["EMAIL","SMS","WHATSAPP"]), "context": z.enum(["PASSWORD_LESS","FORGOT_PASSWORD","UPDATE_EMAIL","UPDATE_PHONE"]), "recipient": z.string(), "code": z.string(), "attempts": z.number().default(0), "maxAttempts": z.number().default(0), "resendTime": z.number(), "dailyLimitAttempts": z.number(), "expiresIn": z.coerce.date(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type OTP = z.infer<typeof OTPSchema>
export const PlanSchema = z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "name": z.string(), "description": z.string(), "amount": z.number().gt(0), "interval": z.enum(["DAY","WEEK","MONTH","YEAR"]), "intervalCount": z.number().default(1), "trialDays": z.number(), "features": z.union([z.object({ "description": z.union([z.string().min(1)]), "code": z.literal("ORGANIZATION_COUNT"), "props": z.union([z.object({ "maxOrganizations": z.union([z.number().gte(1)]) })]) })]).default([]), "highlight": z.boolean().default(false), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type Plan = z.infer<typeof PlanSchema>
export const RoleSchema = z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type Role = z.infer<typeof RoleSchema>
export const UserSchema = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type User = z.infer<typeof UserSchema>
export const WorkspaceSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type Workspace = z.infer<typeof WorkspaceSchema>

export const SignInSchema = z.object({ "email": z.string().email(), "password": z.string() })
export const SignInSchemaOutput = z.object({ "accessToken": z.string() })
export type SignInInput = WithFields<z.infer<typeof SignInSchema>, SignInOutput>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const PasswordLessSchema = z.object({ "email": z.string().email(), "otpVerification": z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "code": z.string().min(4).max(4) }) })
export const PasswordLessSchemaOutput = z.object({ "accessToken": z.string() })
export type PasswordLessInput = WithFields<z.infer<typeof PasswordLessSchema>, PasswordLessOutput>
export type PasswordLessOutput = z.infer<typeof PasswordLessSchemaOutput>

export const SocialSignOnSchema = z.object({ "context": z.enum(["GOOGLE","FACEBOOK"]), "providerToken": z.string() })
export const SocialSignOnSchemaOutput = z.object({ "accessToken": z.string() })
export type SocialSignOnInput = WithFields<z.infer<typeof SocialSignOnSchema>, SocialSignOnOutput>
export type SocialSignOnOutput = z.infer<typeof SocialSignOnSchemaOutput>

export const SignUpSchema = z.object({ "name": z.string(), "email": z.string().email(), "password": z.string().min(8) })
export const SignUpSchemaOutput = z.object({ "accessToken": z.string() })
export type SignUpInput = WithFields<z.infer<typeof SignUpSchema>, SignUpOutput>
export type SignUpOutput = z.infer<typeof SignUpSchemaOutput>

export const ForgotPasswordSchema = z.object({ "email": z.string().email(), "password": z.string().min(8), "otpVerification": z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "code": z.string().min(4).max(4) }) })
export const ForgotPasswordSchemaOutput = z.object({ "accessToken": z.string() })
export type ForgotPasswordInput = WithFields<z.infer<typeof ForgotPasswordSchema>, ForgotPasswordOutput>
export type ForgotPasswordOutput = z.infer<typeof ForgotPasswordSchemaOutput>

export const GetPresignedUrlSchema = z.object({ "filename": z.string(), "context": z.enum(["USER_AVATAR","WORKSPACE_LOGO","ORGANIZATION_LOGO"]) })
export const GetPresignedUrlSchemaOutput = z.object({ "filename": z.string(), "filenameSigned": z.string() })
export type GetPresignedUrlInput = WithFields<z.infer<typeof GetPresignedUrlSchema>, GetPresignedUrlOutput>
export type GetPresignedUrlOutput = z.infer<typeof GetPresignedUrlSchemaOutput>

export const ListOrganizationsSchema = z.object({ "filter": z.string().describe("Generic filter that can match against \n - name\n- status").nullish(), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "offset": z.number().int().describe("Number of items to skip in the result set.").default(0), "limit": z.number().int().describe("Maximum number of items to return.").default(10) })
export const ListOrganizationsSchemaOutput = z.object({ "values": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })), "meta": z.object({ "total": z.number().int(), "offset": z.number().int(), "limit": z.number().int() }) })
export type ListOrganizationsInput = WithFields<z.infer<typeof ListOrganizationsSchema>, ListOrganizationsOutput>
export type ListOrganizationsOutput = z.infer<typeof ListOrganizationsSchemaOutput>

export const CreateOrganizationSchema = z.object({ "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace") })
export const CreateOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type CreateOrganizationInput = WithFields<z.infer<typeof CreateOrganizationSchema>, CreateOrganizationOutput>
export type CreateOrganizationOutput = z.infer<typeof CreateOrganizationSchemaOutput>

export const GetOrganizationSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationId": z.string().uuid().describe("Unique identifier for organization") })
export const GetOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type GetOrganizationInput = WithFields<z.infer<typeof GetOrganizationSchema>, GetOrganizationOutput>
export type GetOrganizationOutput = z.infer<typeof GetOrganizationSchemaOutput>

export const UpdateOrganizationSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationId": z.string().uuid().describe("Unique identifier for organization") })
export const UpdateOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateOrganizationInput = WithFields<z.infer<typeof UpdateOrganizationSchema>, UpdateOrganizationOutput>
export type UpdateOrganizationOutput = z.infer<typeof UpdateOrganizationSchemaOutput>

export const DeleteOrganizationSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationId": z.string().uuid().describe("Unique identifier for organization") })
export const DeleteOrganizationSchemaOutput = z.void()
export type DeleteOrganizationInput = WithFields<z.infer<typeof DeleteOrganizationSchema>, DeleteOrganizationOutput>
export type DeleteOrganizationOutput = z.infer<typeof DeleteOrganizationSchemaOutput>

export const ValidateOTPSchema = z.object({ "context": z.enum(["PASSWORD_LESS","FORGOT_PASSWORD","UPDATE_EMAIL","UPDATE_PHONE"]), "recipient": z.string(), "code": z.string(), "otpId": z.string().uuid().describe("Unique identifier for otp") })
export const ValidateOTPSchemaOutput = z.void()
export type ValidateOTPInput = WithFields<z.infer<typeof ValidateOTPSchema>, ValidateOTPOutput>
export type ValidateOTPOutput = z.infer<typeof ValidateOTPSchemaOutput>

export const SendPasswordLessOTPSchema = z.object({ "email": z.string().email() })
export const SendPasswordLessOTPSchemaOutput = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") })
export type SendPasswordLessOTPInput = WithFields<z.infer<typeof SendPasswordLessOTPSchema>, SendPasswordLessOTPOutput>
export type SendPasswordLessOTPOutput = z.infer<typeof SendPasswordLessOTPSchemaOutput>

export const SendForgotPasswordOTPSchema = z.object({ "email": z.string().email() })
export const SendForgotPasswordOTPSchemaOutput = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") })
export type SendForgotPasswordOTPInput = WithFields<z.infer<typeof SendForgotPasswordOTPSchema>, SendForgotPasswordOTPOutput>
export type SendForgotPasswordOTPOutput = z.infer<typeof SendForgotPasswordOTPSchemaOutput>

export const SendUpdateEmailOTPSchema = z.object({ "email": z.string().email() })
export const SendUpdateEmailOTPSchemaOutput = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") })
export type SendUpdateEmailOTPInput = WithFields<z.infer<typeof SendUpdateEmailOTPSchema>, SendUpdateEmailOTPOutput>
export type SendUpdateEmailOTPOutput = z.infer<typeof SendUpdateEmailOTPSchemaOutput>

export const SendUpdatePhoneOTPSchema = z.object({ "channel": z.enum(["SMS","WHATSAPP"]), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }) })
export const SendUpdatePhoneOTPSchemaOutput = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") })
export type SendUpdatePhoneOTPInput = WithFields<z.infer<typeof SendUpdatePhoneOTPSchema>, SendUpdatePhoneOTPOutput>
export type SendUpdatePhoneOTPOutput = z.infer<typeof SendUpdatePhoneOTPSchemaOutput>

export const GetPermissionsSchema = z.object({})
export const GetPermissionsSchemaOutput = z.union([z.string()])
export type GetPermissionsInput = WithFields<z.infer<typeof GetPermissionsSchema>, GetPermissionsOutput>
export type GetPermissionsOutput = z.infer<typeof GetPermissionsSchemaOutput>

export const ListPlansSchema = z.object({ "offset": z.number().int().describe("Number of items to skip in the result set.").default(0), "limit": z.number().int().describe("Maximum number of items to return.").default(10) })
export const ListPlansSchemaOutput = z.object({ "values": z.array(z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "name": z.string(), "description": z.string(), "amount": z.number().gt(0), "interval": z.enum(["DAY","WEEK","MONTH","YEAR"]), "intervalCount": z.number().default(1), "trialDays": z.number(), "features": z.union([z.object({ "description": z.union([z.string().min(1)]), "code": z.literal("ORGANIZATION_COUNT"), "props": z.union([z.object({ "maxOrganizations": z.union([z.number().gte(1)]) })]) })]).default([]), "highlight": z.boolean().default(false), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })), "meta": z.object({ "total": z.number().int(), "offset": z.number().int(), "limit": z.number().int() }) })
export type ListPlansInput = WithFields<z.infer<typeof ListPlansSchema>, ListPlansOutput>
export type ListPlansOutput = z.infer<typeof ListPlansSchemaOutput>

export const GetProfileSchema = z.object({})
export const GetProfileSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type GetProfileInput = WithFields<z.infer<typeof GetProfileSchema>, GetProfileOutput>
export type GetProfileOutput = z.infer<typeof GetProfileSchemaOutput>

export const UpdateProfileSchema = z.object({ "name": z.string().nullish(), "avatar": z.union([z.string(), z.null()]).nullish() })
export const UpdateProfileSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateProfileInput = WithFields<z.infer<typeof UpdateProfileSchema>, UpdateProfileOutput>
export type UpdateProfileOutput = z.infer<typeof UpdateProfileSchemaOutput>

export const DeactivateProfileSchema = z.object({})
export const DeactivateProfileSchemaOutput = z.void()
export type DeactivateProfileInput = WithFields<z.infer<typeof DeactivateProfileSchema>, DeactivateProfileOutput>
export type DeactivateProfileOutput = z.infer<typeof DeactivateProfileSchemaOutput>

export const UpdateProfileEmailSchema = z.object({ "email": z.string().email(), "otpVerification": z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "code": z.string().min(4).max(4) }) })
export const UpdateProfileEmailSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateProfileEmailInput = WithFields<z.infer<typeof UpdateProfileEmailSchema>, UpdateProfileEmailOutput>
export type UpdateProfileEmailOutput = z.infer<typeof UpdateProfileEmailSchemaOutput>

export const UpdateProfilePhoneSchema = z.object({ "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "otpVerification": z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "code": z.string().min(4).max(4) }) })
export const UpdateProfilePhoneSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateProfilePhoneInput = WithFields<z.infer<typeof UpdateProfilePhoneSchema>, UpdateProfilePhoneOutput>
export type UpdateProfilePhoneOutput = z.infer<typeof UpdateProfilePhoneSchemaOutput>

export const UpdateProfilePasswordSchema = z.object({ "password": z.string().min(8), "currentPassword": z.string() })
export const UpdateProfilePasswordSchemaOutput = z.void()
export type UpdateProfilePasswordInput = WithFields<z.infer<typeof UpdateProfilePasswordSchema>, UpdateProfilePasswordOutput>
export type UpdateProfilePasswordOutput = z.infer<typeof UpdateProfilePasswordSchemaOutput>

export const ListRolesSchema = z.object({ "filter": z.string().describe("Generic filter that can match against \n - name\n- status").nullish(), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "offset": z.number().int().describe("Number of items to skip in the result set.").default(0), "limit": z.number().int().describe("Maximum number of items to return.").default(10) })
export const ListRolesSchemaOutput = z.object({ "values": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })), "meta": z.object({ "total": z.number().int(), "offset": z.number().int(), "limit": z.number().int() }) })
export type ListRolesInput = WithFields<z.infer<typeof ListRolesSchema>, ListRolesOutput>
export type ListRolesOutput = z.infer<typeof ListRolesSchemaOutput>

export const CreateRoleSchema = z.object({ "name": z.string(), "tags": z.union([z.string()]).nullish(), "permissions": z.union([z.string()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace") })
export const CreateRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type CreateRoleInput = WithFields<z.infer<typeof CreateRoleSchema>, CreateRoleOutput>
export type CreateRoleOutput = z.infer<typeof CreateRoleSchemaOutput>

export const GetRoleSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "roleId": z.string().uuid().describe("Unique identifier for plan") })
export const GetRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type GetRoleInput = WithFields<z.infer<typeof GetRoleSchema>, GetRoleOutput>
export type GetRoleOutput = z.infer<typeof GetRoleSchemaOutput>

export const UpdateRoleSchema = z.object({ "name": z.string().nullish(), "tags": z.union([z.string()]).nullish(), "permissions": z.union([z.string()]).nullish(), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "roleId": z.string().uuid().describe("Unique identifier for plan") })
export const UpdateRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateRoleInput = WithFields<z.infer<typeof UpdateRoleSchema>, UpdateRoleOutput>
export type UpdateRoleOutput = z.infer<typeof UpdateRoleSchemaOutput>

export const DeleteRoleSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "roleId": z.string().uuid().describe("Unique identifier for plan") })
export const DeleteRoleSchemaOutput = z.void()
export type DeleteRoleInput = WithFields<z.infer<typeof DeleteRoleSchema>, DeleteRoleOutput>
export type DeleteRoleOutput = z.infer<typeof DeleteRoleSchemaOutput>

export const ListUsersSchema = z.object({ "filter": z.string().describe("Generic filter that can match against \n - name\n- email").nullish(), "workspaceId": z.string().uuid(), "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "offset": z.number().int().describe("Number of items to skip in the result set.").default(0), "limit": z.number().int().describe("Maximum number of items to return.").default(10) })
export const ListUsersSchemaOutput = z.object({ "values": z.array(z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })), "meta": z.object({ "total": z.number().int(), "offset": z.number().int(), "limit": z.number().int() }) })
export type ListUsersInput = WithFields<z.infer<typeof ListUsersSchema>, ListUsersOutput>
export type ListUsersOutput = z.infer<typeof ListUsersSchemaOutput>

export const CreateUserSchema = z.object({ "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "password": z.string().min(8), "workspaceId": z.string().uuid() })
export const CreateUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type CreateUserInput = WithFields<z.infer<typeof CreateUserSchema>, CreateUserOutput>
export type CreateUserOutput = z.infer<typeof CreateUserSchemaOutput>

export const GetUserSchema = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.string().uuid() })
export const GetUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type GetUserInput = WithFields<z.infer<typeof GetUserSchema>, GetUserOutput>
export type GetUserOutput = z.infer<typeof GetUserSchemaOutput>

export const UpdateUserSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.string().uuid() })
export const UpdateUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null().describe("Unique identifier for workspaceId")]).describe("Unique identifier for workspaceId").nullish(), "roleIds": z.union([z.string().uuid().describe("Unique identifier for role")]).describe("Unique identifier for role"), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "permissions": z.union([z.string()]), "tags": z.union([z.string()]).nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.coerce.date(), z.null()]).nullish(), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })).nullish(), "permissions": z.union([z.string()]), "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }).nullish(), "avatar": z.union([z.string(), z.null()]).nullish(), "social": z.object({ "googleId": z.union([z.string(), z.null()]).nullish(), "facebookId": z.union([z.string(), z.null()]).nullish() }).nullish(), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateUserInput = WithFields<z.infer<typeof UpdateUserSchema>, UpdateUserOutput>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const GetWorkspaceSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace") })
export const GetWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type GetWorkspaceInput = WithFields<z.infer<typeof GetWorkspaceSchema>, GetWorkspaceOutput>
export type GetWorkspaceOutput = z.infer<typeof GetWorkspaceSchemaOutput>

export const UpdateWorkspaceSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace") })
export const UpdateWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type UpdateWorkspaceInput = WithFields<z.infer<typeof UpdateWorkspaceSchema>, UpdateWorkspaceOutput>
export type UpdateWorkspaceOutput = z.infer<typeof UpdateWorkspaceSchemaOutput>

export const CreateWorkspaceSchema = z.object({ "name": z.string() })
export const CreateWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.coerce.date(), "updatedAt": z.coerce.date() })
export type CreateWorkspaceInput = WithFields<z.infer<typeof CreateWorkspaceSchema>, CreateWorkspaceOutput>
export type CreateWorkspaceOutput = z.infer<typeof CreateWorkspaceSchemaOutput>

export const signIn = ({ fields, ...input }: SignInInput): Promise<SignInOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/auth/sign-in`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SignInSchemaOutput.parse)
}
export const passwordLess = ({ fields, ...input }: PasswordLessInput): Promise<PasswordLessOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/auth/password-less`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(PasswordLessSchemaOutput.parse)
}
export const socialSignOn = ({ fields, ...input }: SocialSignOnInput): Promise<SocialSignOnOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/auth/social-sign-on`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SocialSignOnSchemaOutput.parse)
}
export const signUp = ({ fields, ...input }: SignUpInput): Promise<SignUpOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/auth/sign-up`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SignUpSchemaOutput.parse)
}
export const forgotPassword = ({ fields, ...input }: ForgotPasswordInput): Promise<ForgotPasswordOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/auth/forgot-password`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(ForgotPasswordSchemaOutput.parse)
}
export const getPresignedUrl = ({ fields, ...input }: GetPresignedUrlInput): Promise<GetPresignedUrlOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/files`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(GetPresignedUrlSchemaOutput.parse)
}
export const listOrganizations = ({ fields, ...input }: ListOrganizationsInput): Promise<ListOrganizationsOutput> => {
    const { 
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/organizations`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(ListOrganizationsSchemaOutput.parse)
}
export const createOrganization = ({ fields, ...input }: CreateOrganizationInput): Promise<CreateOrganizationOutput> => {
    const { 
        workspaceId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/organizations`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(CreateOrganizationSchemaOutput.parse)
}
export const getOrganization = ({ fields, ...input }: GetOrganizationInput): Promise<GetOrganizationOutput> => {
    const { 
        workspaceId,
        organizationId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetOrganizationSchemaOutput.parse)
}
export const updateOrganization = ({ fields, ...input }: UpdateOrganizationInput): Promise<UpdateOrganizationOutput> => {
    const { 
        workspaceId,
        organizationId,
      ...body 
    } = input

    return request.patch(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateOrganizationSchemaOutput.parse)
}
export const deleteOrganization = ({ fields, ...input }: DeleteOrganizationInput): Promise<DeleteOrganizationOutput> => {
    const { 
        workspaceId,
        organizationId,
      ...query
    } = input

    return request.delete(`/v1/workspaces/${workspaceId}/organizations/${organizationId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(DeleteOrganizationSchemaOutput.parse)
}
export const validateOTP = ({ fields, ...input }: ValidateOTPInput): Promise<ValidateOTPOutput> => {
    const { 
        otpId,
      ...body 
    } = input

    return request.post(`/v1/otps/${otpId}/validate`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(ValidateOTPSchemaOutput.parse)
}
export const sendPasswordLessOTP = ({ fields, ...input }: SendPasswordLessOTPInput): Promise<SendPasswordLessOTPOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/otps/password-less`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SendPasswordLessOTPSchemaOutput.parse)
}
export const sendForgotPasswordOTP = ({ fields, ...input }: SendForgotPasswordOTPInput): Promise<SendForgotPasswordOTPOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/otps/forgot-password`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SendForgotPasswordOTPSchemaOutput.parse)
}
export const sendUpdateEmailOTP = ({ fields, ...input }: SendUpdateEmailOTPInput): Promise<SendUpdateEmailOTPOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/otps/update-email`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SendUpdateEmailOTPSchemaOutput.parse)
}
export const sendUpdatePhoneOTP = ({ fields, ...input }: SendUpdatePhoneOTPInput): Promise<SendUpdatePhoneOTPOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/otps/update-phone`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(SendUpdatePhoneOTPSchemaOutput.parse)
}
export const getPermissions = ({ fields, ...input }: GetPermissionsInput): Promise<GetPermissionsOutput> => {
    const { 
      ...query
    } = input

    return request.get(`/v1/permissions`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetPermissionsSchemaOutput.parse)
}
export const listPlans = ({ fields, ...input }: ListPlansInput): Promise<ListPlansOutput> => {
    const { 
      ...query
    } = input

    return request.get(`/v1/plans`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(ListPlansSchemaOutput.parse)
}
export const getProfile = ({ fields, ...input }: GetProfileInput): Promise<GetProfileOutput> => {
    const { 
      ...query
    } = input

    return request.get(`/v1/profile`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetProfileSchemaOutput.parse)
}
export const updateProfile = ({ fields, ...input }: UpdateProfileInput): Promise<UpdateProfileOutput> => {
    const { 
      ...body 
    } = input

    return request.patch(`/v1/profile`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateProfileSchemaOutput.parse)
}
export const deactivateProfile = ({ fields, ...input }: DeactivateProfileInput): Promise<DeactivateProfileOutput> => {
    const { 
      ...query
    } = input

    return request.delete(`/v1/profile`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(DeactivateProfileSchemaOutput.parse)
}
export const updateProfileEmail = ({ fields, ...input }: UpdateProfileEmailInput): Promise<UpdateProfileEmailOutput> => {
    const { 
      ...body 
    } = input

    return request.patch(`/v1/profile/email`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateProfileEmailSchemaOutput.parse)
}
export const updateProfilePhone = ({ fields, ...input }: UpdateProfilePhoneInput): Promise<UpdateProfilePhoneOutput> => {
    const { 
      ...body 
    } = input

    return request.patch(`/v1/profile/phone`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateProfilePhoneSchemaOutput.parse)
}
export const updateProfilePassword = ({ fields, ...input }: UpdateProfilePasswordInput): Promise<UpdateProfilePasswordOutput> => {
    const { 
      ...body 
    } = input

    return request.patch(`/v1/profile/password`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateProfilePasswordSchemaOutput.parse)
}
export const listRoles = ({ fields, ...input }: ListRolesInput): Promise<ListRolesOutput> => {
    const { 
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/roles`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(ListRolesSchemaOutput.parse)
}
export const createRole = ({ fields, ...input }: CreateRoleInput): Promise<CreateRoleOutput> => {
    const { 
        workspaceId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/roles`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(CreateRoleSchemaOutput.parse)
}
export const getRole = ({ fields, ...input }: GetRoleInput): Promise<GetRoleOutput> => {
    const { 
        workspaceId,
        roleId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/roles/${roleId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetRoleSchemaOutput.parse)
}
export const updateRole = ({ fields, ...input }: UpdateRoleInput): Promise<UpdateRoleOutput> => {
    const { 
        workspaceId,
        roleId,
      ...body 
    } = input

    return request.patch(`/v1/workspaces/${workspaceId}/roles/${roleId}`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateRoleSchemaOutput.parse)
}
export const deleteRole = ({ fields, ...input }: DeleteRoleInput): Promise<DeleteRoleOutput> => {
    const { 
        workspaceId,
        roleId,
      ...query
    } = input

    return request.delete(`/v1/workspaces/${workspaceId}/roles/${roleId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(DeleteRoleSchemaOutput.parse)
}
export const listUsers = ({ fields, ...input }: ListUsersInput): Promise<ListUsersOutput> => {
    const { 
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/users`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(ListUsersSchemaOutput.parse)
}
export const createUser = ({ fields, ...input }: CreateUserInput): Promise<CreateUserOutput> => {
    const { 
        workspaceId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/users`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(CreateUserSchemaOutput.parse)
}
export const getUser = ({ fields, ...input }: GetUserInput): Promise<GetUserOutput> => {
    const { 
        userId,
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/users/${userId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetUserSchemaOutput.parse)
}
export const updateUser = ({ fields, ...input }: UpdateUserInput): Promise<UpdateUserOutput> => {
    const { 
        userId,
        workspaceId,
      ...body 
    } = input

    return request.patch(`/v1/workspaces/${workspaceId}/users/${userId}`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateUserSchemaOutput.parse)
}
export const getWorkspace = ({ fields, ...input }: GetWorkspaceInput): Promise<GetWorkspaceOutput> => {
    const { 
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetWorkspaceSchemaOutput.parse)
}
export const updateWorkspace = ({ fields, ...input }: UpdateWorkspaceInput): Promise<UpdateWorkspaceOutput> => {
    const { 
        workspaceId,
      ...body 
    } = input

    return request.patch(`/v1/workspaces/${workspaceId}`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(UpdateWorkspaceSchemaOutput.parse)
}
export const createWorkspace = ({ fields, ...input }: CreateWorkspaceInput): Promise<CreateWorkspaceOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/workspaces`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(CreateWorkspaceSchemaOutput.parse)
}
