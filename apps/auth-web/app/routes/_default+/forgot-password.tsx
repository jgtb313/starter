import { type MetaFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { Flex, Card, Typography } from '@starter/ui'

import { Brand } from '~/common'
import { ForgotPasswordForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Forgot Password` }]
}

const Page = () => {
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

          <ForgotPasswordForm />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
