import { type MetaFunction } from '@remix-run/node'
import config from '@starter/config'
import { Flex, Typography } from '@starter/ui'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Dashboard` }]
}

const Page = () => {
  return (
    <Flex direction="column" gap={32}>
      <Typography>Dashboard</Typography>
    </Flex>
  )
}

export default Page
