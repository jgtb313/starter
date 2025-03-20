import { useState } from 'react'
import { SendPasswordLessOTPSchema, PasswordLessSchema, type SendPasswordLessOTPInput, type PasswordLessInput } from '@starter/client'
import { useSendPasswordLessOTP, usePasswordLess } from '@starter/store'
import { Flex, Center, Form, TextInput, PinInput, Button, useForm } from '@starter/ui-web'

import { useAuth } from '~/hooks'

export const SignInForm = () => {
  const { authenticate } = useAuth()
  const [sendPasswordLessOTP, { loading: loadingSendPasswordLessOTP }] = useSendPasswordLessOTP()
  const [passwordLess, { loading: loadingPasswordLess }] = usePasswordLess()
  const [step, setStep] = useState<'SEND' | 'SUBMIT'>('SEND')
  const form = useForm<SendPasswordLessOTPInput | PasswordLessInput>({
    schema: step === 'SEND' ? SendPasswordLessOTPSchema : PasswordLessSchema,
  })
  const loading = loadingSendPasswordLessOTP || loadingPasswordLess

  const handleSendPasswordLessOTP = ({ email }: SendPasswordLessOTPInput) => {
    sendPasswordLessOTP({
      params: {
        email,
      },
      onSuccess: ({ otpId }) => {
        form.setValue('otpVerification.otpId', otpId)
        setStep('SUBMIT')
      },
    })
  }

  const handlePasswordLess = ({ email, otpVerification }: PasswordLessInput) => {
    passwordLess({
      params: {
        email,
        otpVerification,
      },
      onSuccess: ({ accessToken }) => {
        authenticate(accessToken)
      },
    })
  }

  const handleSubmit = (values: SendPasswordLessOTPInput | PasswordLessInput) => {
    if (step === 'SEND') {
      handleSendPasswordLessOTP(values as SendPasswordLessOTPInput)
    } else if (step === 'SUBMIT') {
      handlePasswordLess(values as PasswordLessInput)
    }
  }

  return (
    <Flex direction="column" gap={16}>
      <Form {...form} id="Form" onSubmit={handleSubmit}>
        {step === 'SEND' && (
          <Flex direction="column" gap={8}>
            <TextInput<SendPasswordLessOTPInput> name="email" size="sm" label="Email" placeholder="example@email.com" />
          </Flex>
        )}

        {step === 'SUBMIT' && (
          <Center>
            <PinInput<PasswordLessInput> name="otpVerification.code" size="sm" length={4} />
          </Center>
        )}
      </Form>

      <Button form="Form" type="submit" size="sm" loading={loading} fullWidth>
        Continue
      </Button>
    </Flex>
  )
}
