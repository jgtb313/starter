import { ForgotPasswordSchema } from '@ss/schema'
import { Flex, Form, Button, Link, useForm } from '@ss/components'

import { useAuth } from '~/stores'
import { SignInForm } from './ForgotPasswordForm.types'

export const ForgotPasswordForm = () => {
  const { forgotPassword, loadingForgotPassword } = useAuth()
  const form = useForm<SignInForm['initialValues']>()

  const initialValues = { email: null }

  const handleSubmit: SignInForm['onSubmit'] = (values) => {
    forgotPassword(
      {
        ...values,
        recaptcha: ''
      },
      {
        onSuccess: () => {
          form.current?.reset()
        }
      }
    )
  }

  return (
    <Form ref={form} initialValues={initialValues} schema={ForgotPasswordSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="email" label="E-mail" placeholder="Digite o seu email" data-testid="email" />

          <Button type="submit" size="lg" loading={loadingForgotPassword} block data-testid="submit">
            Enviar
          </Button>

          <Link href="/sign-in" fw={600} td="underline" ta="center" data-testid="sign-in">
            Login
          </Link>
        </Flex>
      )}
    </Form>
  )
}
