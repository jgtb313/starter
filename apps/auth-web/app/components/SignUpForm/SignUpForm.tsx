import { SignUpSchema } from '@starter/schema'
import { Flex, Form, Button, Link, Divider, Typography } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { SocialAuthentication } from '../SocialAuthentication'
import { SignUpFormProps, ISignUpForm } from './SignUpForm.types'

export const SignUpForm = ({ onSubmit, loading }: SignUpFormProps) => {
  const router = useRouter()

  const initialValues: ISignUpForm['initialValues'] = { name: null, email: null, password: null }

  return (
    <Form initialValues={initialValues} schema={SignUpSchema} onSubmit={onSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="name" label="Name" placeholder="Enter your name" />

          <Form.Input name="email" label="Email" placeholder="Enter your email" />

          <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" />

          <Button type="submit" size="lg" loading={loading} block>
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
