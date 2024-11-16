import { z, RecoverPasswordSchema, RecoverPasswordInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type RecoverPasswordFormProps = {
  recoverPasswordToken: string
}

export type IRecoverPasswordForm = FormProps<RecoverPasswordInput>

export const RecoverPasswordFormSchema = RecoverPasswordSchema.and(
  z.object({
    confirmPassword: z.string(),
  }),
).refine(
  ({ password, confirmPassword }) => {
    return password === confirmPassword
  },
  { path: ['confirmPassword'], message: 'Passwords do not match' },
)
