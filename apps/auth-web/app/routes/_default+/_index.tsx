import { redirect, json, type MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import client, { ApiError } from '@starter/client'
import { SignInInput, SocialSignInInput } from '@starter/schema'
import { Flex, Card, Typography, toast } from '@starter/ui'
import { useFetcher } from '@starter/use-remix-hooks'
import { useWatch } from '@starter/use-hooks'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { getFormData } from '~/support/get-form-data'
import { setupCookie } from '~/cookie.server'
import { Brand } from '~/common'
import { SignInForm, ISignInForm, ISocialAuthentication } from '~/components'

type SignInAction = {
  type: 'email' | 'social'
}

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign In` }]
}

export const action = async (args: ActionFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const formData = await getFormData<SignInAction>(args)

  let accessToken = ''

  if (formData.type === 'email') {
    try {
      const response = await client.auth.signIn(formData as unknown as SignInInput)

      accessToken = response.accessToken
    } catch (error) {
      return json(error)
    }
  } else {
    try {
      const response = await client.auth.socialSignIn(formData as unknown as SocialSignInInput)

      accessToken = response.accessToken
    } catch (error) {
      return json(error)
    }
  }

  const cookieHeader = await setupCookie(args, accessToken)

  return redirect(clientIdInfos.redirectUrl, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  })
}

const Page = () => {
  const fetcher = useFetcher<ApiError>()

  const handleSubmit: ISignInForm['onSubmit'] = async (values) => {
    await fetcher.submit({ type: 'email', ...values }, { method: 'post' })
  }

  const handleSocialSubmit: ISocialAuthentication['onSubmit'] = async (values) => {
    await fetcher.submit({ type: 'social', ...values }, { method: 'post' })
  }

  useWatch(() => {
    if (!fetcher.data) {
      return
    }

    toast.error({ message: fetcher.data.message })
  }, [fetcher.data])

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

            <SignInForm onSubmit={handleSubmit} onSocialSubmit={handleSocialSubmit} loading={fetcher.loading} />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
