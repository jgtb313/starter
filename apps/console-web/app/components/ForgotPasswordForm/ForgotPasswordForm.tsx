import { ForgotPasswordSchema } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, useForm, toast } from '@starter/ui'

import { IForgotPasswordForm } from './ForgotPasswordForm.types'

export const ForgotPasswordForm = () => {
  const { forgotPassword, loadingForgotPassword } = useAuth()
  const form = useForm<IForgotPasswordForm['initialValues']>()

  const initialValues: IForgotPasswordForm['initialValues'] = { email: null }

  const handleSubmit: IForgotPasswordForm['onSubmit'] = (values) => {
    forgotPassword(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success({
            message: 'An email has been sent. Please check your inbox.',
          })

          form.current?.reset()
        },
      },
    )
  }

  return (
    <Form ref={form} initialValues={initialValues} schema={ForgotPasswordSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="email" label="Email" placeholder="Enter your email" />

          <Button type="submit" size="lg" loading={loadingForgotPassword} block>
            Send
          </Button>

          <Link href="/sign-in" fw={600} td="underline" ta="center">
            Sign In
          </Link>
        </Flex>
      )}
    </Form>
  )
}
