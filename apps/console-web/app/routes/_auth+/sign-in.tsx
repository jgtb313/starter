import { type MetaFunction } from '@remix-run/node'
import { Flex, Card, Typography } from '@ss/components'

import { Brand } from '~/common'
import { SignInForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Acesso' }]
}

const Page = () => {
  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card padding="lg" bordered>
        <Flex direction="column" gap={8}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Acessar minha conta
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Insira suas credenciais abaixo para acessar sua conta.
          </Typography>

          <SignInForm />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
