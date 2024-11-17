import { json, redirect, type MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import config from '@starter/config'
import client from '@starter/client'
import { SignInInput } from '@starter/schema'
import { Flex, Card, Typography } from '@starter/ui'

import { cookie } from '~/cookie.server'
import { Brand } from '~/common'
import { SignInForm, ISignInForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign In` }]
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const clientId = url.searchParams.get('client_id')

  const formData = await request.formData()
  const { email, password } = Object.fromEntries(formData) as SignInInput

  const { accessToken } = await client.auth.signIn({ email, password })

  const session = await cookie.getSession()

  session.set('accessToken', accessToken)

  const cookieHeader = await cookie.commitSession(session)

  return redirect('/sign-up', {
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
              Welcome Back! Sign In to Continue
            </Typography>

            <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
              Enter your credentials below to access your account.
            </Typography>

            <SignInForm onSubmit={handleSubmit} loading={loading} />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
