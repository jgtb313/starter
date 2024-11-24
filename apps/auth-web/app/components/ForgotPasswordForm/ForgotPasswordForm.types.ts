import { z, ForgotPasswordSchema as Schema, OTPVerificationSchema } from '@starter/schema'
import { FormProps } from '@starter/ui'

export enum ForgotPasswordFormStage {
  SEND = 'SEND',
  VALIDATE = 'VALIDATE',
  RESET = 'RESET'
}

export const ForgotPasswordSchema = z.discriminatedUnion('stage', [
  z.object({
    stage: z.literal(ForgotPasswordFormStage.SEND),
  }).merge(Schema.pick({ email: true })),
  z.object({
    stage: z.literal(ForgotPasswordFormStage.VALIDATE),
  }).merge(Schema.pick({ email: true })).merge(z.object({ otpVerification: OTPVerificationSchema })),
  z.object({
    stage: z.literal(ForgotPasswordFormStage.RESET),
  }).merge(Schema).merge(z.object({ otpVerification: OTPVerificationSchema })),
])

export type IForgotPasswordForm = FormProps<z.infer<typeof ForgotPasswordSchema>>
