import { z, RecoverPasswordSchema, RecoverPasswordInput } from '@ss/schema'
import { FormProps } from '@ss/components'

export type RecoverPasswordFormProps = {
  recoverPasswordToken: string
}

export type RecoverPasswordForm = FormProps<RecoverPasswordInput>

export const RecoverPasswordFormSchema = RecoverPasswordSchema.and(
  z.object({
    confirmPassword: z.string()
  })
).refine(
  ({ password, confirmPassword }) => {
    return password === confirmPassword
  },
  { path: ['confirmPassword'], message: 'As senhas não conferem' }
)
