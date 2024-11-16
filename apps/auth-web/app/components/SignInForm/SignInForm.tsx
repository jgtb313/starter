import { SignInSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, Typography, Divider } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { useAuthenticate } from '~/support/use-authenticate'
import { SocialAuthentication } from '../SocialAuthentication'
import { ISignInForm } from './SignInForm.types'

export const SignInForm = () => {
  const router = useRouter()
  const { signIn, loadingSignIn } = useAuth()
  const authenticate = useAuthenticate()

  const initialValues: ISignInForm['initialValues'] = { email: null, password: null }

  const handleSubmit: ISignInForm['onSubmit'] = (values) => {
    signIn(
      {
        ...values,
      },
      {
        onSuccess: ({ authorizationToken }) => {
          authenticate(authorizationToken)
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

          <Link href={`/forgot-password/${router.search}`} fw={600} td="underline" ta="right" ml={4}>
            Forgot password?
          </Link>

          <Flex direction="column" gap={16}>
            <Button type="submit" size="lg" loading={loadingSignIn} block>
              Sign In
            </Button>

            <Typography ta="center">
              Don’t have an account?
              <Link href={`/sign-up/${router.search}`} fw={600} td="underline" ml={4}>
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
