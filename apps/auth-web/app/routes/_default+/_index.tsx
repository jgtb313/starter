import { type MetaFunction } from '@remix-run/node'
import config from '@starter/config'
import { Flex, Card, Typography } from '@starter/ui'

import { Brand } from '~/common'
import { SignInForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign In` }]
}

const Page = () => {
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

            <SignInForm />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
