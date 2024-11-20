import { redirect, type MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { config } from '@starter/config'
import client from '@starter/client'
import { SignInInput, SocialSignInInput } from '@starter/schema'
import { Flex, Card, Typography } from '@starter/ui'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { setupCookie } from '~/support/setup-cookies'
import { Brand } from '~/common'
import { SignInForm, ISignInForm, ISocialAuthentication } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign In` }]
}

export const action = async (args: ActionFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const formData = await args.request.formData()
  const type = formData.get('type')

  let cookieHeader = ''

  if (type === 'email') {
    const { email, password } = Object.fromEntries(formData) as SignInInput

    const { accessToken } = await client.auth.signIn({ email, password })

    cookieHeader = await setupCookie(args, accessToken)
  } else {
    const { context, providerToken } = Object.fromEntries(formData) as SocialSignInInput

    const { accessToken } = await client.auth.socialSignIn({ context, providerToken })

    cookieHeader = await setupCookie(args, accessToken)
  }

  return redirect(clientIdInfos.redirectUrl, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  })
}

const Page = () => {
  const fetcher = useFetcher()
  const loading = fetcher.state === 'submitting'

  const handleSubmit: ISignInForm['onSubmit'] = async (values) => {
    const formData = new FormData()

    formData.append('type', 'email')
    formData.append('email', values.email)
    formData.append('password', values.password)

    await fetcher.submit(formData, { method: 'post' })
  }

  const handleSocialSubmit: ISocialAuthentication['onSubmit'] = async (values) => {
    const formData = new FormData()

    formData.append('type', 'social')
    formData.append('context', values.context)
    formData.append('providerToken', values.providerToken)

    await fetcher.submit(formData, { method: 'post' })
  }

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card w={500} padding="lg" bordered>
        <Card.Body>
          <Flex direction="column" gap={8}>
            <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
              Welcome Back! Sign In to Continue
            </Typography>

            <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
              Enter your credentials below to access your account.
            </Typography>

            <SignInForm onSubmit={handleSubmit} onSocialSubmit={handleSocialSubmit} loading={loading} />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
