import { SignInSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link } from '@starter/ui'

import { ISignInForm } from './SignInForm.types'

export const SignInForm = () => {
  const { signIn, loadingSignIn } = useAuth()

  const initialValues: ISignInForm['initialValues'] = { email: null, password: null }

  const handleSubmit: ISignInForm['onSubmit'] = (values) => {
    signIn({
      ...values,
    })
  }

  return (
    <Form initialValues={initialValues} schema={SignInSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="email" label="Email" placeholder="Enter your email" data-testid="signIn-email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" data-testid="signIn-password" />

          <Button type="submit" size="lg" loading={loadingSignIn} block data-testid="signIn-submit">
            Sign In
          </Button>

          <Link href="/forgot-password" fw={600} td="underline" ta="center" data-testid="forgot-password">
            Forgot password
          </Link>
        </Flex>
      )}
    </Form>
  )
}
