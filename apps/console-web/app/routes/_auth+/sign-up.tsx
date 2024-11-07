import { type MetaFunction } from '@remix-run/node'
import config from '@starter/config'
import { Flex, Card, Typography } from '@starter/ui'

import { Brand, SignUpForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Sign Up` }]
}

const Page = () => {
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

            <SignUpForm />
          </Flex>
        </Card.Body>
      </Card>
    </Flex>
  )
}

export default Page
