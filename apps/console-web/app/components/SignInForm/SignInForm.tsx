import { SignInSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, Typography, Divider } from '@starter/ui'

import { SocialAuthentication } from '../SocialAuthentication'
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
        <Flex direction="column" gap={24}>
          <Form.Input name="email" label="Email Address" placeholder="Enter your email" data-testid="signIn-email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" data-testid="signIn-password" />

          <Link href="/forgot-password" fw={600} size="sm" td="underline" ta="right" ml={4} data-testid="sign-up">
            Forgot password?
          </Link>

          <Flex direction="column" gap={16}>
            <Button type="submit" size="lg" loading={loadingSignIn} block data-testid="signIn-submit">
              Sign In
            </Button>

            <Typography ta="center">
              Don’t have an account?
              <Link href="/sign-up" fw={600} td="underline" ml={4} data-testid="sign-up">
                Register
              </Link>
            </Typography>
          </Flex>

          <Divider label="OR" />

          <SocialAuthentication />
        </Flex>
      )}
    </Form>
  )
}
