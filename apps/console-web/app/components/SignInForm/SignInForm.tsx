import { SignInSchema } from '@ss/schema'
import { Flex, Form, Button, Link } from '@ss/components'

import { useAuth } from '~/stores'
import { ISignInForm } from './SignInForm.types'

export const SignInForm = () => {
  const { signIn, loadingSignIn } = useAuth()

  const initialValues: ISignInForm['initialValues'] = { email: null, password: null }

  const handleSubmit: ISignInForm['onSubmit'] = (values) => {
    signIn({
      ...values,
      recaptcha: ''
    })
  }

  return (
    <Form initialValues={initialValues} schema={SignInSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="email" label="E-mail" placeholder="Digite o seu email" data-testid="signIn-email" />

          <Form.PasswordInput name="password" label="Senha" placeholder="Digite a sua senha" data-testid="signIn-password" />

          <Button type="submit" size="lg" loading={loadingSignIn} block data-testid="signIn-submit">
            Entrar
          </Button>

          <Link href="/forgot-password" fw={600} td="underline" ta="center" data-testid="forgot-password">
            Esqueci a senha
          </Link>
        </Flex>
      )}
    </Form>
  )
}
