import { z, ForgotPasswordSchema as BaseForgotPasswordSchema, OTPVerificationSchema } from '@starter/schema'
import { FormProps } from '@starter/ui'

export enum ForgotPasswordFormStage {
  SEND = 'SEND',
  VALIDATE = 'VALIDATE',
  RESET = 'RESET',
}

const CustomForgotPasswordSchema = BaseForgotPasswordSchema.extend({
  confirmPassword: z.string().min(1),
})

export const ForgotPasswordSchema = z
  .discriminatedUnion('stage', [
    z
      .object({
        stage: z.literal(ForgotPasswordFormStage.SEND),
      })
      .merge(BaseForgotPasswordSchema.pick({ email: true })),
    z
      .object({
        stage: z.literal(ForgotPasswordFormStage.VALIDATE),
      })
      .merge(BaseForgotPasswordSchema.pick({ email: true }))
      .merge(z.object({ otpVerification: OTPVerificationSchema })),
    z
      .object({
        stage: z.literal(ForgotPasswordFormStage.RESET),
      })
      .merge(CustomForgotPasswordSchema)
      .merge(z.object({ otpVerification: OTPVerificationSchema })),
  ])
  .superRefine((data, ctx) => {
    if (data.stage === ForgotPasswordFormStage.RESET) {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          path: ['confirmPassword'],
          message: 'Passwords do not match',
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export type IForgotPasswordForm = FormProps<z.infer<typeof ForgotPasswordSchema>>

export type ForgotPasswordFormProps = {
  onSubmit?: IForgotPasswordForm['onSubmit']
  loading?: boolean
}
