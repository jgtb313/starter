import { useAuth } from '@starter/store'
import { Flex, Form, Button, Link, toast } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { RecoverPasswordFormSchema, RecoverPasswordFormProps, IRecoverPasswordForm } from './RecoverPasswordForm.types'

export const RecoverPasswordForm = ({ recoverPasswordToken }: RecoverPasswordFormProps) => {
  const router = useRouter()
  const { recoverPassword, loadingRecoverPassword } = useAuth()

  const initialValues: IRecoverPasswordForm['initialValues'] = { recoverPasswordToken, password: null }

  const handleSubmit: IRecoverPasswordForm['onSubmit'] = (values) => {
    recoverPassword(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success({
            message: 'Your password has been updated.',
          })

          router.push('/sign-in')
        },
      },
    )
  }

  return (
    <Form initialValues={initialValues} schema={RecoverPasswordFormSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.PasswordInput name="password" label="New Password" placeholder="Enter your new password" data-testid="recoverPassword-password" />

          <Form.PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            data-testid="recoverPassword-confirmPassword"
          />

          <Button type="submit" size="lg" loading={loadingRecoverPassword} block data-testid="recoverPassword-submit">
            Reset Password
          </Button>

          <Link href="/sign-in" fw={600} td="underline" ta="center" data-testid="recoverPassword-signIn">
            Sign In
          </Link>
        </Flex>
      )}
    </Form>
  )
}
