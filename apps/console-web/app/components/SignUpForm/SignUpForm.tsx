import { SignUpSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, Divider } from '@starter/ui'

import { SocialAuthentication } from '../SocialAuthentication'
import { ISignUpForm } from './SignUpForm.types'

export const SignUpForm = () => {
  const { signUp, loadingSignUp } = useAuth()

  const initialValues: ISignUpForm['initialValues'] = { name: null, email: null, password: null }

  const handleSubmit: ISignUpForm['onSubmit'] = (values) => {
    signUp({
      ...values,
    })
  }

  return (
    <Form initialValues={initialValues} schema={SignUpSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="name" label="Name" placeholder="Enter your name" data-testid="signUp-name" />

          <Form.Input name="email" label="Email" placeholder="Enter your email" data-testid="signUp-email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" data-testid="signUp-password" />

          <Button type="submit" size="lg" loading={loadingSignUp} block data-testid="signUp-submit">
            Sign Up
          </Button>

          <Link href="/sign-in" fw={600} td="underline" ta="center" data-testid="sign-in">
            Sign In
          </Link>

          <Divider label="OR" />

          <SocialAuthentication />
        </Flex>
      )}
    </Form>
  )
}
