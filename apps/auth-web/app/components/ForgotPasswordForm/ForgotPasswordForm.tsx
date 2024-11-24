import { useAuth, useOTP } from '@starter/store'
import { Flex, Form, Button, Link, useForm } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { ForgotPasswordSchema, IForgotPasswordForm, ForgotPasswordFormStage } from './ForgotPasswordForm.types'
import { OTPContextEnum } from '@starter/schema'

export const ForgotPasswordForm = () => {
  const router = useRouter()
  const { forgotPassword, loadingForgotPassword } = useAuth()
  const { sendForgotPasswordOTP, validateOTP, loadingSendForgotPasswordOTP, loadingValidateOTP } = useOTP()
  const form = useForm<IForgotPasswordForm['initialValues']>()

  const initialValues: IForgotPasswordForm['initialValues'] = { stage: ForgotPasswordFormStage.SEND, email: null, password: null, otpVerification: { id: null, code: null } } as any

  const handleSubmit: IForgotPasswordForm['onSubmit'] = (values) => {
    if (values.stage === ForgotPasswordFormStage.SEND) {
      sendForgotPasswordOTP({ email: values.email }, {
        onSuccess: ({ otpId }) => {
          form.current?.update('stage', ForgotPasswordFormStage.VALIDATE)
          form.current?.update('otpVerification.id', otpId)
        }
      })
    } else if (values.stage === ForgotPasswordFormStage.VALIDATE) {
      validateOTP({ id: values.otpVerification.id, context: OTPContextEnum.FORGOT_PASSWORD, recipient: values.email, code: values.otpVerification.code }, {
        onSuccess: () => {
          form.current?.update('stage', ForgotPasswordFormStage.RESET)
        }
      })
    } else if (values.stage === ForgotPasswordFormStage.RESET) {
      forgotPassword(
        values,
        {
          onSuccess: () => {
            form.current?.reset()
          },
        },
      )
    }
  }

  return (
    <Form ref={form} initialValues={initialValues} schema={ForgotPasswordSchema} onSubmit={handleSubmit}>
      {({ values }: any) => (
        <Flex direction="column" gap={16}>
          {values?.stage === ForgotPasswordFormStage.SEND && <Form.Input name="email" label="Email" placeholder="Enter your email" />}

          {values?.stage === ForgotPasswordFormStage.VALIDATE && <Form.PinInput name="otpVerification.code" />}

          {values?.stage === ForgotPasswordFormStage.RESET && <Form.PasswordInput name="password" label="Password"  placeholder="Enter your password" />}

          {values?.stage === ForgotPasswordFormStage.RESET && <Form.PasswordInput name="confirmPassword" label="Confirm password" placeholder="Confirm your password" />}

          <Button type="submit" size="lg" loading={loadingForgotPassword || loadingSendForgotPasswordOTP || loadingValidateOTP} block>
            Continue
          </Button>

          <Link href={`/${router.search}`} fw={600} td="underline" ta="center">
            Sign In
          </Link>
        </Flex>
      )}
    </Form>
  )
}
