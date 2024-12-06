import { redirect, json, type MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import client, { ApiError } from '@starter/client'
import { ForgotPasswordInput } from '@starter/schema'
import { Flex, Card, Typography, Brand } from '@starter/ui'
import { useFetcher } from '@starter/use-remix-hooks'
import { get } from '@starter/shared'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { getFormData } from '~/support/get-form-data'
import { setupCookie } from '~/cookie.server'
import { ForgotPasswordForm, IForgotPasswordForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Forgot Password` }]
}

export const action = async (args: ActionFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const { otpVerification, ...data } = await getFormData<ForgotPasswordInput & { otpVerification: string }>(args)

  try {
    const { accessToken } = await client.auth.forgotPassword({
      ...data,
      otpVerification: JSON.parse(otpVerification),
    })

    const cookieHeader = await setupCookie(args, accessToken)

    return redirect(clientIdInfos.redirectUrl, {
      headers: {
        'Set-Cookie': cookieHeader,
      },
    })
  } catch (error) {
    return json(error)
  }
}

const Page = () => {
  const fetcher = useFetcher<ApiError>()

  const handleSubmit: IForgotPasswordForm['onSubmit'] = async (values) => {
    await fetcher.submit({ ...values, otpVerification: JSON.stringify(get(values, 'otpVerification')) }, { method: 'post' })
  }

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card w={500} padding="lg" bordered>
        <Flex direction="column" gap={16}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Forgot your password?
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Don't worry, we’ll help you. Enter your registered email to reset your password.
          </Typography>

          <ForgotPasswordForm onSubmit={handleSubmit} loading={fetcher.loading} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
