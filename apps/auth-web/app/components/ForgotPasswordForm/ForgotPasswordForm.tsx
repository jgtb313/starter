import { OTPContextEnum } from '@starter/schema'
import { useOTP } from '@starter/store'
import { Flex, Form, Button, Link, useForm, toast, FormRenderer } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { ForgotPasswordSchema, ForgotPasswordFormProps, IForgotPasswordForm, ForgotPasswordFormStage } from './ForgotPasswordForm.types'

export const ForgotPasswordForm = ({ onSubmit, loading }: ForgotPasswordFormProps) => {
  const router = useRouter()
  const { sendForgotPasswordOTP, validateOTP, loadingSendForgotPasswordOTP, loadingValidateOTP } = useOTP()
  const form = useForm<IForgotPasswordForm['initialValues']>()

  const initialValues: IForgotPasswordForm['initialValues'] = {
    stage: ForgotPasswordFormStage.SEND,
    email: null,
    password: null,
    otpVerification: { id: null, code: null },
  } as any

  const handleSubmit: IForgotPasswordForm['onSubmit'] = (values) => {
    if (values.stage === ForgotPasswordFormStage.SEND) {
      sendForgotPasswordOTP(
        { email: values.email },
        {
          onSuccess: ({ otpId }) => {
            toast.success({ message: 'A verification code has been sent to your email.' })

            form.current?.update('stage', ForgotPasswordFormStage.VALIDATE)
            form.current?.update('otpVerification.id', otpId)
          },
        },
      )
    } else if (values.stage === ForgotPasswordFormStage.VALIDATE) {
      validateOTP(
        { id: values.otpVerification.id, context: OTPContextEnum.FORGOT_PASSWORD, recipient: values.email, code: values.otpVerification.code },
        {
          onSuccess: () => {
            toast.success({ message: 'Your code has been successfully validated.' })

            form.current?.update('stage', ForgotPasswordFormStage.RESET)
          },
        },
      )
    } else if (values.stage === ForgotPasswordFormStage.RESET) {
      onSubmit?.(values)
    }
  }

  return (
    <Form ref={form} initialValues={initialValues} schema={ForgotPasswordSchema} onSubmit={handleSubmit}>
      {({ values }: FormRenderer<IForgotPasswordForm['initialValues']>) => (
        <Flex direction="column" gap={16}>
          {values?.stage === ForgotPasswordFormStage.SEND && <Form.Input name="email" label="Email" placeholder="Enter your email" />}

          {values?.stage === ForgotPasswordFormStage.VALIDATE && <Form.PinInput name="otpVerification.code" />}

          {values?.stage === ForgotPasswordFormStage.RESET && (
            <Form.PasswordInput name="password" label="Password" placeholder="Enter your password" />
          )}

          {values?.stage === ForgotPasswordFormStage.RESET && (
            <Form.PasswordInput name="confirmPassword" label="Confirm password" placeholder="Confirm your password" />
          )}

          <Button type="submit" size="lg" loading={loading || loadingSendForgotPasswordOTP || loadingValidateOTP} block>
            {values?.stage === ForgotPasswordFormStage.RESET ? 'Reset' : 'Continue'}
          </Button>

          <Link href={`/${router.search}`} fw={600} td="underline" ta="center">
            Sign In
          </Link>
        </Flex>
      )}
    </Form>
  )
}
