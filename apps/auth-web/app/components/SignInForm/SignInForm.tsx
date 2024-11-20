import { SignInSchema } from '@starter/schema'
import { Flex, Form, Button, Link, Typography, Divider } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { SocialAuthentication } from '../SocialAuthentication'
import { SignInFormProps, ISignInForm } from './SignInForm.types'

export const SignInForm = ({ onSubmit, onSocialSubmit, loading }: SignInFormProps) => {
  const router = useRouter()

  const initialValues: ISignInForm['initialValues'] = { email: 'test10@gmail.com', password: '123123123' }

  return (
    <Form initialValues={initialValues} schema={SignInSchema} onSubmit={onSubmit}>
      {() => (
        <Flex direction="column" gap={24}>
          <Form.Input name="email" label="Email" placeholder="Enter your email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" />

          <Link href={`/forgot-password/${router.search}`} fw={600} td="underline" ta="right" ml={4}>
            Forgot password?
          </Link>

          <Flex direction="column" gap={16}>
            <Button type="submit" size="lg" loading={loading} block>
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

          <SocialAuthentication onSubmit={onSocialSubmit} />
        </Flex>
      )}
    </Form>
  )
}
