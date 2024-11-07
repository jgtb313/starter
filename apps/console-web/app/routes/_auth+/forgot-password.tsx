import { type MetaFunction } from '@remix-run/node'
import config from '@starter/config'
import { Flex, Card, Typography } from '@starter/ui'

import { Brand } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Forgot Password` }]
}

const Page = () => {
  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card padding="lg" bordered>
        <Flex direction="column" gap={16}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Esqueceu sua senha ?
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Não se preocupe, nós vamos te ajudar. Digite o e-mail cadastrado para redefinir a sua senha.
          </Typography>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
