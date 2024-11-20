import { type MetaFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { Flex, Card, Typography } from '@starter/ui'
import { useRouter } from '@starter/use-remix-hooks'

import { Brand } from '~/common'
import { RecoverPasswordForm } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Recover Password` }]
}

type PageProps = {
  params: {
    recoverPasswordToken: string
  }
}

const Page = () => {
  const { params } = useRouter<unknown, PageProps['params']>()

  return (
    <Flex maw={450} direction="column" align="center" gap={32}>
      <Brand width={350} />

      <Card w={500} padding="lg" bordered>
        <Flex direction="column" gap={16}>
          <Typography component="h2" size="lg" ta="center" fw={600} mb={8}>
            Reset Your Password
          </Typography>

          <Typography component="p" maw="80%" size="md" ta="center" mx="auto" my={0}>
            Enter your new password and confirm it to complete the reset. Make sure to choose a strong password to keep your account secure.
          </Typography>

          <RecoverPasswordForm recoverPasswordToken={params.recoverPasswordToken} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
