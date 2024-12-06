import { redirect, json, type MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import client, { ApiError } from '@starter/client'
import { config } from '@starter/config'
import { SignUpInput } from '@starter/schema'
import { Flex, Card, Typography, Brand, toast } from '@starter/ui'
import { useFetcher } from '@starter/use-remix-hooks'
import { useWatch } from '@starter/use-hooks'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { getFormData } from '~/support/get-form-data'
import { setupCookie } from '~/cookie.server'
import { SignUpForm, ISignUpForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign Up` }]
}

export const action = async (args: ActionFunctionArgs) => {
  const clientIdInfos = getClientIdInfos(args)

  if (!clientIdInfos) {
    return redirect(config.oauth.fallbackUrl)
  }

  const formData = await getFormData<SignUpInput>(args)

  try {
    const { accessToken } = await client.auth.signUp(formData)

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

  const handleSubmit: ISignUpForm['onSubmit'] = async (values) => {
    await fetcher.submit(values, { method: 'post' })
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
              Create an Account
            </Typography>

            <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
              Enter your details below to create an account.
            </Typography>

            <SignUpForm onSubmit={handleSubmit} loading={fetcher.loading} />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
