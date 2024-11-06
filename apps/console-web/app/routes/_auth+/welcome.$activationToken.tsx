import { type MetaFunction } from '@remix-run/node'
import { Flex, Card, Typography } from '@starter/ui'

import { useParams } from '~/hooks'
import { Brand } from '~/common'
import { AccountActivationForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Ativação' }]
}

type PageProps = { accountActivationToken: string }

const Page = () => {
  const { accountActivationToken } = useParams<PageProps>()

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card padding="lg" bordered>
        <Flex direction="column" gap={16}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Ative a sua conta
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Para ativar sua conta, por favor, defina sua senha. Após definir a senha, você terá acesso completo à sua conta.
          </Typography>

          <AccountActivationForm accountActivationToken={accountActivationToken} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
