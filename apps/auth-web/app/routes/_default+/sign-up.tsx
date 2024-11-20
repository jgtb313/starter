import { useFetcher } from '@remix-run/react'
import { ActionFunctionArgs, redirect, type MetaFunction } from '@remix-run/node'
import client from '@starter/client'
import { config } from '@starter/config'
import { SignUpInput } from '@starter/schema'
import { Flex, Card, Typography } from '@starter/ui'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { setupCookie } from '~/cookie.server'
import { Brand } from '~/common'
import { SignUpForm, ISignUpForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign Up` }]
}

export const action = async (args: ActionFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const formData = await args.request.formData()
  const { name, email, password } = Object.fromEntries(formData) as SignUpInput

  const { accessToken } = await client.auth.signUp({ name, email, password })

  const cookieHeader = await setupCookie(args, accessToken)

  return redirect(clientIdInfos.redirectUrl, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  })
}

const Page = () => {
  const fetcher = useFetcher()
  const loading = fetcher.state === 'submitting'

  const handleSubmit: ISignUpForm['onSubmit'] = async (values) => {
    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('password', values.password)

    await fetcher.submit(formData, { method: 'post' })
  }

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card w={500} padding="lg" bordered>
        <Card.Body>
          <Flex direction="column" gap={8}>
            <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
              Create an Account
            </Typography>

            <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
              Enter your details below to create an account.
            </Typography>

            <SignUpForm onSubmit={handleSubmit} loading={loading} />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
