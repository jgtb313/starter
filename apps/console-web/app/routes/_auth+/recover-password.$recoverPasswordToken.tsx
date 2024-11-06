import { type MetaFunction } from '@remix-run/node'
import { Flex, Card, Typography } from '@ss/components'

import { useParams } from '~/hooks'
import { Brand } from '~/common'
import { RecoverPasswordForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Redefinir senha' }]
}

type PageProps = { recoverPasswordToken: string }

const Page = () => {
  const { recoverPasswordToken } = useParams<PageProps>()

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card padding="lg" bordered>
        <Flex direction="column" gap={16}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Redefina a sua senha
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Insira sua nova senha e confirme-a para concluir a redefinição. Certifique-se de escolher uma senha forte para proteger sua conta.
          </Typography>

          <RecoverPasswordForm recoverPasswordToken={recoverPasswordToken} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
