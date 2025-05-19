// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

import { z } from '@starter/schema'

import { formatFields, WithFields } from '@/support/fields'
import { request } from '@/request'

export const InvoiceSchema = z.record(z.void()).and(z.union([z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "pix": z.object({ "qrCode": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "boleto": z.object({ "url": z.string(), "instructions": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })]))
export type Invoice = z.infer<typeof InvoiceSchema>
export const OrganizationSchema = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type Organization = z.infer<typeof OrganizationSchema>
export const OTPSchema = z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp"), "userId": z.union([z.string().uuid().describe("Unique identifier for user"), z.null()]), "channel": z.enum(["EMAIL","SMS","WHATSAPP"]), "context": z.enum(["PASSWORD_LESS","FORGOT_PASSWORD","UPDATE_EMAIL","UPDATE_PHONE"]), "recipient": z.string(), "code": z.string(), "attempts": z.number().default(0), "maxAttempts": z.number().default(0), "resendTime": z.number(), "dailyLimitAttempts": z.number(), "expiresIn": z.iso.datetime().transform((value) => new Date(value)), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type OTP = z.infer<typeof OTPSchema>
export const PlanSchema = z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "name": z.string(), "description": z.string(), "amount": z.number(), "interval": z.enum(["DAY","WEEK","MONTH","YEAR"]), "intervalCount": z.number().default(1), "trialDays": z.number(), "features": z.array(z.object({ "description": z.string(), "code": z.literal("ORGANIZATION_COUNT"), "props": z.object({ "maxOrganizations": z.number().default(1) }) })).default([]), "highlight": z.boolean().default(false), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type Plan = z.infer<typeof PlanSchema>
export const RoleSchema = z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type Role = z.infer<typeof RoleSchema>
export const SubscriptionSchema = z.record(z.void()).and(z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })]))
export type Subscription = z.infer<typeof SubscriptionSchema>
export const UserSchema = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type User = z.infer<typeof UserSchema>
export const WorkspaceSchema = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "integrations": z.union([z.object({ "recurrenceCustomerId": z.string() }), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type Workspace = z.infer<typeof WorkspaceSchema>

export const SignInSchema = z.object({ "email": z.string().email(), "password": z.string() })
export const SignInSchemaOutput = z.object({ "accessToken": z.string() })
export type SignInInput = WithFields<z.infer<typeof SignInSchema>, SignInOutput>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const PasswordLessSchema = z.object({ "email": z.string().email(), "otpVerification": z.intersection(z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") }), z.object({ "code": z.string().min(4).max(4) })) })
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

export const ForgotPasswordSchema = z.object({ "email": z.string().email(), "password": z.string().min(8), "otpVerification": z.intersection(z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") }), z.object({ "code": z.string().min(4).max(4) })) })
export const ForgotPasswordSchemaOutput = z.object({ "accessToken": z.string() })
export type ForgotPasswordInput = WithFields<z.infer<typeof ForgotPasswordSchema>, ForgotPasswordOutput>
export type ForgotPasswordOutput = z.infer<typeof ForgotPasswordSchemaOutput>

export const ListInvoicesSchema = z.object({ "offset": z.number().nullish(), "limit": z.number().nullish(), "workspaceId": z.string().uuid() })
export const ListInvoicesSchemaOutput = z.object({ "values": z.array(z.union([z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "pix": z.object({ "qrCode": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "boleto": z.object({ "url": z.string(), "instructions": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])), "meta": z.object({ "total": z.number().default(0), "offset": z.number().default(0), "limit": z.number().default(0) }).default({"total":0,"offset":0,"limit":0}) })
export type ListInvoicesInput = WithFields<z.infer<typeof ListInvoicesSchema>, ListInvoicesOutput>
export type ListInvoicesOutput = z.infer<typeof ListInvoicesSchemaOutput>

export const GetInvoiceSchema = z.object({ "workspaceId": z.string().uuid(), "invoiceId": z.string().uuid() })
export const GetInvoiceSchemaOutput = z.union([z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "pix": z.object({ "qrCode": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "invoiceId": z.string().uuid().describe("Unique identifier for invoice"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "externalId": z.string(), "description": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "boleto": z.object({ "url": z.string(), "instructions": z.string(), "dueDate": z.iso.datetime().transform((value) => new Date(value)) }), "dueDate": z.iso.datetime().transform((value) => new Date(value)), "issuedAt": z.iso.datetime().transform((value) => new Date(value)), "paidAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["PENDING","PAID","OVERDUE","CANCELED"]).default("PENDING"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type GetInvoiceInput = WithFields<z.infer<typeof GetInvoiceSchema>, GetInvoiceOutput>
export type GetInvoiceOutput = z.infer<typeof GetInvoiceSchemaOutput>

export const GetPresignedUrlSchema = z.object({ "fileName": z.string(), "context": z.enum(["USER_AVATAR","WORKSPACE_LOGO","ORGANIZATION_LOGO"]) })
export const GetPresignedUrlSchemaOutput = z.object({ "fileName": z.string(), "fileNameSigned": z.string() })
export type GetPresignedUrlInput = WithFields<z.infer<typeof GetPresignedUrlSchema>, GetPresignedUrlOutput>
export type GetPresignedUrlOutput = z.infer<typeof GetPresignedUrlSchemaOutput>

export const ListOrganizationsSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).nullish(), "filter": z.string().nullish(), "offset": z.number().nullish(), "limit": z.number().nullish(), "workspaceId": z.string().uuid() })
export const ListOrganizationsSchemaOutput = z.object({ "values": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })), "meta": z.object({ "total": z.number().default(0), "offset": z.number().default(0), "limit": z.number().default(0) }).default({"total":0,"offset":0,"limit":0}) })
export type ListOrganizationsInput = WithFields<z.infer<typeof ListOrganizationsSchema>, ListOrganizationsOutput>
export type ListOrganizationsOutput = z.infer<typeof ListOrganizationsSchemaOutput>

export const CreateOrganizationSchema = z.object({ "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid() })
export const CreateOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type CreateOrganizationInput = WithFields<z.infer<typeof CreateOrganizationSchema>, CreateOrganizationOutput>
export type CreateOrganizationOutput = z.infer<typeof CreateOrganizationSchemaOutput>

export const GetOrganizationSchema = z.object({ "workspaceId": z.string().uuid(), "organizationId": z.string().uuid() })
export const GetOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetOrganizationInput = WithFields<z.infer<typeof GetOrganizationSchema>, GetOrganizationOutput>
export type GetOrganizationOutput = z.infer<typeof GetOrganizationSchemaOutput>

export const UpdateOrganizationSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid(), "organizationId": z.string().uuid() })
export const UpdateOrganizationSchemaOutput = z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateOrganizationInput = WithFields<z.infer<typeof UpdateOrganizationSchema>, UpdateOrganizationOutput>
export type UpdateOrganizationOutput = z.infer<typeof UpdateOrganizationSchemaOutput>

export const DeleteOrganizationSchema = z.object({ "workspaceId": z.string().uuid(), "organizationId": z.string().uuid() })
export const DeleteOrganizationSchemaOutput = z.void()
export type DeleteOrganizationInput = WithFields<z.infer<typeof DeleteOrganizationSchema>, DeleteOrganizationOutput>
export type DeleteOrganizationOutput = z.infer<typeof DeleteOrganizationSchemaOutput>

export const ValidateOTPSchema = z.object({ "context": z.enum(["PASSWORD_LESS","FORGOT_PASSWORD","UPDATE_EMAIL","UPDATE_PHONE"]), "recipient": z.string(), "code": z.string(), "otpId": z.string().uuid() })
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
export const GetPermissionsSchemaOutput = z.array(z.object({ "key": z.enum(["user:create","user:read","user:update","user:delete","workspace:manage","workspace:create","workspace:read","workspace:update","workspace:delete","organization:manage","organization:create","organization:read","organization:update","organization:delete","role:create","role:read","role:update","role:delete","invoice:read","subscription:create","subscription:read","subscription:update:plan","subscription:update:payment-method","subscription:delete"]), "subject": z.enum(["user","workspace","organization","role","invoice","subscription"]), "action": z.string().describe("Depends on the subject. Common values include: read, write, update, delete."), "title": z.string().describe("Human-readable name of the permission."), "description": z.string().describe("Detailed explanation of what the permission allows within the system.") }))
export type GetPermissionsInput = WithFields<z.infer<typeof GetPermissionsSchema>, GetPermissionsOutput>
export type GetPermissionsOutput = z.infer<typeof GetPermissionsSchemaOutput>

export const ListPlansSchema = z.object({ "offset": z.number().nullish(), "limit": z.number().nullish() })
export const ListPlansSchemaOutput = z.object({ "values": z.array(z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "name": z.string(), "description": z.string(), "amount": z.number(), "interval": z.enum(["DAY","WEEK","MONTH","YEAR"]), "intervalCount": z.number().default(1), "trialDays": z.number(), "features": z.array(z.object({ "description": z.string(), "code": z.literal("ORGANIZATION_COUNT"), "props": z.object({ "maxOrganizations": z.number().default(1) }) })).default([]), "highlight": z.boolean().default(false), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })), "meta": z.object({ "total": z.number().default(0), "offset": z.number().default(0), "limit": z.number().default(0) }).default({"total":0,"offset":0,"limit":0}) })
export type ListPlansInput = WithFields<z.infer<typeof ListPlansSchema>, ListPlansOutput>
export type ListPlansOutput = z.infer<typeof ListPlansSchemaOutput>

export const GetPlanSchema = z.object({ "planId": z.string().uuid() })
export const GetPlanSchemaOutput = z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "name": z.string(), "description": z.string(), "amount": z.number(), "interval": z.enum(["DAY","WEEK","MONTH","YEAR"]), "intervalCount": z.number().default(1), "trialDays": z.number(), "features": z.array(z.object({ "description": z.string(), "code": z.literal("ORGANIZATION_COUNT"), "props": z.object({ "maxOrganizations": z.number().default(1) }) })).default([]), "highlight": z.boolean().default(false), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetPlanInput = WithFields<z.infer<typeof GetPlanSchema>, GetPlanOutput>
export type GetPlanOutput = z.infer<typeof GetPlanSchemaOutput>

export const GetProfileSchema = z.object({})
export const GetProfileSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetProfileInput = WithFields<z.infer<typeof GetProfileSchema>, GetProfileOutput>
export type GetProfileOutput = z.infer<typeof GetProfileSchemaOutput>

export const UpdateProfileSchema = z.object({ "name": z.string().nullish(), "avatar": z.union([z.string(), z.null()]).nullish() })
export const UpdateProfileSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateProfileInput = WithFields<z.infer<typeof UpdateProfileSchema>, UpdateProfileOutput>
export type UpdateProfileOutput = z.infer<typeof UpdateProfileSchemaOutput>

export const DeactivateProfileSchema = z.object({})
export const DeactivateProfileSchemaOutput = z.void()
export type DeactivateProfileInput = WithFields<z.infer<typeof DeactivateProfileSchema>, DeactivateProfileOutput>
export type DeactivateProfileOutput = z.infer<typeof DeactivateProfileSchemaOutput>

export const UpdateProfileEmailSchema = z.object({ "email": z.string().email(), "otpVerification": z.intersection(z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") }), z.object({ "code": z.string().min(4).max(4) })) })
export const UpdateProfileEmailSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateProfileEmailInput = WithFields<z.infer<typeof UpdateProfileEmailSchema>, UpdateProfileEmailOutput>
export type UpdateProfileEmailOutput = z.infer<typeof UpdateProfileEmailSchemaOutput>

export const UpdateProfilePhoneSchema = z.object({ "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "otpVerification": z.intersection(z.object({ "otpId": z.string().uuid().describe("Unique identifier for otp") }), z.object({ "code": z.string().min(4).max(4) })) })
export const UpdateProfilePhoneSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateProfilePhoneInput = WithFields<z.infer<typeof UpdateProfilePhoneSchema>, UpdateProfilePhoneOutput>
export type UpdateProfilePhoneOutput = z.infer<typeof UpdateProfilePhoneSchemaOutput>

export const UpdateProfilePasswordSchema = z.object({ "password": z.string().min(8), "currentPassword": z.string() })
export const UpdateProfilePasswordSchemaOutput = z.void()
export type UpdateProfilePasswordInput = WithFields<z.infer<typeof UpdateProfilePasswordSchema>, UpdateProfilePasswordOutput>
export type UpdateProfilePasswordOutput = z.infer<typeof UpdateProfilePasswordSchemaOutput>

export const ListRolesSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).nullish(), "filter": z.string().nullish(), "offset": z.number().nullish(), "limit": z.number().nullish(), "workspaceId": z.string().uuid() })
export const ListRolesSchemaOutput = z.object({ "values": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })), "meta": z.object({ "total": z.number().default(0), "offset": z.number().default(0), "limit": z.number().default(0) }).default({"total":0,"offset":0,"limit":0}) })
export type ListRolesInput = WithFields<z.infer<typeof ListRolesSchema>, ListRolesOutput>
export type ListRolesOutput = z.infer<typeof ListRolesSchemaOutput>

export const CreateRoleSchema = z.object({ "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "name": z.string(), "tags": z.union([z.array(z.string()), z.null()]), "permissions": z.array(z.string()).default([]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid() })
export const CreateRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type CreateRoleInput = WithFields<z.infer<typeof CreateRoleSchema>, CreateRoleOutput>
export type CreateRoleOutput = z.infer<typeof CreateRoleSchemaOutput>

export const GetRoleSchema = z.object({ "workspaceId": z.string().uuid(), "roleId": z.string().uuid() })
export const GetRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetRoleInput = WithFields<z.infer<typeof GetRoleSchema>, GetRoleOutput>
export type GetRoleOutput = z.infer<typeof GetRoleSchemaOutput>

export const UpdateRoleSchema = z.object({ "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")).nullish(), "name": z.string().nullish(), "tags": z.union([z.array(z.string()), z.null()]).nullish(), "permissions": z.array(z.string()).default([]), "workspaceId": z.string().uuid(), "roleId": z.string().uuid() })
export const UpdateRoleSchemaOutput = z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateRoleInput = WithFields<z.infer<typeof UpdateRoleSchema>, UpdateRoleOutput>
export type UpdateRoleOutput = z.infer<typeof UpdateRoleSchemaOutput>

export const DeleteRoleSchema = z.object({ "workspaceId": z.string().uuid(), "roleId": z.string().uuid() })
export const DeleteRoleSchemaOutput = z.void()
export type DeleteRoleInput = WithFields<z.infer<typeof DeleteRoleSchema>, DeleteRoleOutput>
export type DeleteRoleOutput = z.infer<typeof DeleteRoleSchemaOutput>

export const GetSubscriptionSchema = z.object({ "workspaceId": z.string().uuid(), "subscriptionId": z.string().uuid() })
export const GetSubscriptionSchemaOutput = z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type GetSubscriptionInput = WithFields<z.infer<typeof GetSubscriptionSchema>, GetSubscriptionOutput>
export type GetSubscriptionOutput = z.infer<typeof GetSubscriptionSchemaOutput>

export const CancelSubscriptionSchema = z.object({ "workspaceId": z.string().uuid(), "subscriptionId": z.string().uuid() })
export const CancelSubscriptionSchemaOutput = z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type CancelSubscriptionInput = WithFields<z.infer<typeof CancelSubscriptionSchema>, CancelSubscriptionOutput>
export type CancelSubscriptionOutput = z.infer<typeof CancelSubscriptionSchemaOutput>

export const CreateSubscriptionSchema = z.object({ "workspaceId": z.string().uuid() })
export const CreateSubscriptionSchemaOutput = z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type CreateSubscriptionInput = WithFields<z.infer<typeof CreateSubscriptionSchema>, CreateSubscriptionOutput>
export type CreateSubscriptionOutput = z.infer<typeof CreateSubscriptionSchemaOutput>

export const ChangeSubscriptionPlanSchema = z.object({ "planId": z.string().uuid().describe("Unique identifier for plan"), "workspaceId": z.string().uuid(), "subscriptionId": z.string().uuid() })
export const ChangeSubscriptionPlanSchemaOutput = z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type ChangeSubscriptionPlanInput = WithFields<z.infer<typeof ChangeSubscriptionPlanSchema>, ChangeSubscriptionPlanOutput>
export type ChangeSubscriptionPlanOutput = z.infer<typeof ChangeSubscriptionPlanSchemaOutput>

export const ChangeSubscriptionPaymentMethodSchema = z.object({ "workspaceId": z.string().uuid(), "subscriptionId": z.string().uuid() })
export const ChangeSubscriptionPaymentMethodSchemaOutput = z.union([z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("CARD"), "card": z.object({ "token": z.string().describe("Token representing a securely stored payment card, typically returned by a payment provider."), "number": z.string().describe("Masked card number for secure display."), "holderName": z.string().describe("Name of the cardholder as printed on the card."), "expirationDate": z.string().describe("Card expiration date in MM/YY format.") }), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("PIX"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) }), z.object({ "subscriptionId": z.string().uuid().describe("Unique identifier for subscription"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "planId": z.string().uuid().describe("Unique identifier for plan"), "externalId": z.string(), "amount": z.number(), "paymentMethod": z.literal("BOLETO"), "payer": z.object({ "name": z.string(), "email": z.string().email(), "phone": z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), "document": z.object({ "number": z.string(), "type": z.enum(["INDIVIDUAL","COMPANY"]).describe("Represents document types for individuals or companies") }), "address": z.object({ "state": z.string().describe("Two-letter state code following the ISO 3166-2 standard for country subdivisions."), "city": z.string().describe("City name."), "zipCode": z.string().describe("ZIP or postal code, containing digits only."), "neighborhood": z.string().describe("Neighborhood or district name."), "street": z.string().describe("Street name."), "number": z.string().describe("Street number."), "complement": z.union([z.string(), z.null()]).describe("Additional address details (nullish).") }) }), "deadline": z.iso.datetime().transform((value) => new Date(value)), "canceledAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "status": z.enum(["TRIAL","ACTIVE","OVERDUE","CANCELED"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })])
export type ChangeSubscriptionPaymentMethodInput = WithFields<z.infer<typeof ChangeSubscriptionPaymentMethodSchema>, ChangeSubscriptionPaymentMethodOutput>
export type ChangeSubscriptionPaymentMethodOutput = z.infer<typeof ChangeSubscriptionPaymentMethodSchemaOutput>

export const ListUsersSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).nullish(), "filter": z.string().nullish(), "offset": z.number().nullish(), "limit": z.number().nullish(), "workspaceId": z.string().uuid() })
export const ListUsersSchemaOutput = z.object({ "values": z.array(z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })), "meta": z.object({ "total": z.number().default(0), "offset": z.number().default(0), "limit": z.number().default(0) }).default({"total":0,"offset":0,"limit":0}) })
export type ListUsersInput = WithFields<z.infer<typeof ListUsersSchema>, ListUsersOutput>
export type ListUsersOutput = z.infer<typeof ListUsersSchemaOutput>

export const CreateUserSchema = z.object({ "workspaceId": z.string().uuid() })
export const CreateUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type CreateUserInput = WithFields<z.infer<typeof CreateUserSchema>, CreateUserOutput>
export type CreateUserOutput = z.infer<typeof CreateUserSchemaOutput>

export const GetUserSchema = z.object({ "userId": z.string().uuid(), "workspaceId": z.string().uuid() })
export const GetUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetUserInput = WithFields<z.infer<typeof GetUserSchema>, GetUserOutput>
export type GetUserOutput = z.infer<typeof GetUserSchemaOutput>

export const UpdateUserSchema = z.object({ "userId": z.string().uuid(), "workspaceId": z.string().uuid() })
export const UpdateUserSchemaOutput = z.object({ "userId": z.string().uuid().describe("Unique identifier for user"), "workspaceId": z.union([z.string().uuid().describe("Unique identifier for workspaceId"), z.null()]), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "roleIds": z.array(z.string().uuid().describe("Unique identifier for role")), "roles": z.array(z.object({ "roleId": z.string().uuid().describe("Unique identifier for role"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "organizationIds": z.array(z.string().uuid().describe("Unique identifier for organization")), "organizations": z.array(z.object({ "organizationId": z.string().uuid().describe("Unique identifier for organization"), "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "name": z.string(), "permissions": z.array(z.string()).default([]), "tags": z.union([z.array(z.string()), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "deletedAt": z.union([z.iso.datetime().transform((value) => new Date(value)), z.null()]), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })).default([]), "permissions": z.array(z.string()).default([]), "name": z.string(), "email": z.string().email(), "phone": z.union([z.object({ "iso": z.string().describe("The ISO 3166-1 country code."), "ddi": z.string().describe("The international dialing code for the country, prefixed by the plus sign (+)."), "number": z.string() }), z.null()]), "avatar": z.union([z.string(), z.null()]), "social": z.union([z.object({ "googleId": z.union([z.string(), z.null()]), "facebookId": z.union([z.string(), z.null()]) }).default({"googleId":null,"facebookId":null}), z.null()]), "password": z.string().min(8), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateUserInput = WithFields<z.infer<typeof UpdateUserSchema>, UpdateUserOutput>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const GetWorkspaceSchema = z.object({ "workspaceId": z.string().uuid() })
export const GetWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "integrations": z.union([z.object({ "recurrenceCustomerId": z.string() }), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type GetWorkspaceInput = WithFields<z.infer<typeof GetWorkspaceSchema>, GetWorkspaceOutput>
export type GetWorkspaceOutput = z.infer<typeof GetWorkspaceSchemaOutput>

export const UpdateWorkspaceSchema = z.object({ "name": z.string().nullish(), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "workspaceId": z.string().uuid() })
export const UpdateWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "integrations": z.union([z.object({ "recurrenceCustomerId": z.string() }), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
export type UpdateWorkspaceInput = WithFields<z.infer<typeof UpdateWorkspaceSchema>, UpdateWorkspaceOutput>
export type UpdateWorkspaceOutput = z.infer<typeof UpdateWorkspaceSchemaOutput>

export const CreateWorkspaceSchema = z.object({ "name": z.string() })
export const CreateWorkspaceSchemaOutput = z.object({ "workspaceId": z.string().uuid().describe("Unique identifier for workspace"), "name": z.string(), "integrations": z.union([z.object({ "recurrenceCustomerId": z.string() }), z.null()]), "status": z.enum(["ACTIVE","INACTIVE"]).default("ACTIVE"), "createdAt": z.iso.datetime().transform((value) => new Date(value)), "updatedAt": z.iso.datetime().transform((value) => new Date(value)) })
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
export const listInvoices = ({ fields, ...input }: ListInvoicesInput): Promise<ListInvoicesOutput> => {
    const { 
        workspaceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/invoices`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(ListInvoicesSchemaOutput.parse)
}
export const getInvoice = ({ fields, ...input }: GetInvoiceInput): Promise<GetInvoiceOutput> => {
    const { 
        workspaceId,
        invoiceId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/invoices/${invoiceId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetInvoiceSchemaOutput.parse)
}
export const getPresignedUrl = ({ fields, ...input }: GetPresignedUrlInput): Promise<GetPresignedUrlOutput> => {
    const { 
      ...body 
    } = input

    return request.post(`/v1/storage/files`, body, {
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
export const getPlan = ({ fields, ...input }: GetPlanInput): Promise<GetPlanOutput> => {
    const { 
        planId,
      ...query
    } = input

    return request.get(`/v1/plans/${planId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetPlanSchemaOutput.parse)
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
export const getSubscription = ({ fields, ...input }: GetSubscriptionInput): Promise<GetSubscriptionOutput> => {
    const { 
        workspaceId,
        subscriptionId,
      ...query
    } = input

    return request.get(`/v1/workspaces/${workspaceId}/subscriptions/${subscriptionId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(GetSubscriptionSchemaOutput.parse)
}
export const cancelSubscription = ({ fields, ...input }: CancelSubscriptionInput): Promise<CancelSubscriptionOutput> => {
    const { 
        workspaceId,
        subscriptionId,
      ...query
    } = input

    return request.delete(`/v1/workspaces/${workspaceId}/subscriptions/${subscriptionId}`, {
      params: { 
        fields: formatFields(fields), 
        ...query
      }
    }).then(CancelSubscriptionSchemaOutput.parse)
}
export const createSubscription = ({ fields, ...input }: CreateSubscriptionInput): Promise<CreateSubscriptionOutput> => {
    const { 
        workspaceId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/subscriptions`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(CreateSubscriptionSchemaOutput.parse)
}
export const changeSubscriptionPlan = ({ fields, ...input }: ChangeSubscriptionPlanInput): Promise<ChangeSubscriptionPlanOutput> => {
    const { 
        workspaceId,
        subscriptionId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/subscriptions/${subscriptionId}/plan`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(ChangeSubscriptionPlanSchemaOutput.parse)
}
export const changeSubscriptionPaymentMethod = ({ fields, ...input }: ChangeSubscriptionPaymentMethodInput): Promise<ChangeSubscriptionPaymentMethodOutput> => {
    const { 
        workspaceId,
        subscriptionId,
      ...body 
    } = input

    return request.post(`/v1/workspaces/${workspaceId}/subscriptions/${subscriptionId}/payment-method`, body, {
      params: { 
        fields: formatFields(fields), 
      }
    }).then(ChangeSubscriptionPaymentMethodSchemaOutput.parse)
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
