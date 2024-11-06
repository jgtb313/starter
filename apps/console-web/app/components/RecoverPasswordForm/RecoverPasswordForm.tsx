import { Flex, Form, Button, Link } from '@ss/components'

import { useRouter } from '~/hooks'
import { useAuth } from '~/stores'
import { RecoverPasswordFormSchema, RecoverPasswordFormProps, RecoverPasswordForm as IRecoverPasswordForm } from './RecoverPasswordForm.types'

export const RecoverPasswordForm = ({ recoverPasswordToken }: RecoverPasswordFormProps) => {
  const router = useRouter()
  const { recoverPassword, loadingRecoverPassword } = useAuth()

  const initialValues: IRecoverPasswordForm['initialValues'] = { recoverPasswordToken, password: null }

  const handleSubmit: IRecoverPasswordForm['onSubmit'] = (values) => {
    recoverPassword(
      {
        ...values,
        recaptcha: ''
      },
      {
        onSuccess: () => {
          router.push('/sign-in')
        }
      }
    )
  }

  return (
    <Form initialValues={initialValues} schema={RecoverPasswordFormSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.PasswordInput name="password" label="Nova senha" placeholder="Digite a sua nova senha" data-testid="recoverPassword-password" />

          <Form.PasswordInput
            name="confirmPassword"
            label="Confirme a senha"
            placeholder="Confirme a sua nova senha"
            data-testid="recoverPassword-confirmPassword"
          />

          <Button type="submit" size="lg" loading={loadingRecoverPassword} block data-testid="recoverPassword-submit">
            Redefinir
          </Button>

          <Link href="/sign-in" fw={600} td="underline" ta="center" data-testid="recoverPassword-signIn">
            Login
          </Link>
        </Flex>
      )}
    </Form>
  )
}
