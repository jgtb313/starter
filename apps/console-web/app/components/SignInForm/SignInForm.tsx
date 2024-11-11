import { SignInSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, Typography, Divider } from '@starter/ui'

import { useAuthenticate } from '~/support/use-authenticate'
import { SocialAuthentication } from '../SocialAuthentication'
import { ISignInForm } from './SignInForm.types'

export const SignInForm = () => {
  const { signIn, loadingSignIn } = useAuth()
  const authenticate = useAuthenticate()

  const initialValues: ISignInForm['initialValues'] = { email: null, password: null }

  const handleSubmit: ISignInForm['onSubmit'] = (values) => {
    signIn(
      {
        ...values,
      },
      {
        onSuccess: ({ token }) => {
          authenticate(token)
        },
      },
    )
  }

  return (
    <Form initialValues={initialValues} schema={SignInSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={24}>
          <Form.Input name="email" label="Email" placeholder="Enter your email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" />

          <Link href="/forgot-password" fw={600} size="sm" td="underline" ta="right" ml={4}>
            Forgot password?
          </Link>

          <Flex direction="column" gap={16}>
            <Button type="submit" size="lg" loading={loadingSignIn} block>
              Sign In
            </Button>

            <Typography ta="center">
              Don’t have an account?
              <Link href="/sign-up" fw={600} td="underline" ml={4}>
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
