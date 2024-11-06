import { z, AccountActivationSchema, AccountActivationInput } from '@ss/schema'
import { FormProps } from '@ss/components'

export type AccountActivationFormProps = {
  accountActivationToken: string
}

export type IAccountActivationForm = FormProps<AccountActivationInput>

export const AccountActivationFormSchema = AccountActivationSchema.and(
  z.object({
    confirmPassword: z.string()
  })
).refine(
  ({ password, confirmPassword }) => {
    return password === confirmPassword
  },
  { path: ['confirmPassword'], message: 'As senhas não conferem' }
)
