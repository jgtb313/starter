import { type MetaFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { Flex } from '@starter/ui'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Home` }]
}

const Page = () => {
  return <Flex direction="column" justify="center" align="center"></Flex>
}

export default Page
