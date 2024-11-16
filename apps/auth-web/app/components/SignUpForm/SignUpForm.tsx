import { SignUpSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, Divider, Typography } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { useAuthenticate } from '~/support/use-authenticate'
import { SocialAuthentication } from '../SocialAuthentication'
import { ISignUpForm } from './SignUpForm.types'

export const SignUpForm = () => {
  const router = useRouter()
  const { signUp, loadingSignUp } = useAuth()
  const authenticate = useAuthenticate()

  const initialValues: ISignUpForm['initialValues'] = { name: null, email: null, password: null }

  const handleSubmit: ISignUpForm['onSubmit'] = (values) => {
    signUp(
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
    <Form initialValues={initialValues} schema={SignUpSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="name" label="Name" placeholder="Enter your name" />

          <Form.Input name="email" label="Email" placeholder="Enter your email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" />

          <Button type="submit" size="lg" loading={loadingSignUp} block>
            Sign Up
          </Button>

          <Typography ta="center">
            Already have an account?
            <Link href={`/${router.search}`} fw={600} td="underline" ml={4}>
              Sign In
            </Link>
          </Typography>

          <Divider label="OR" />

          <SocialAuthentication />
        </Flex>
      )}
    </Form>
  )
}
