import { redirect, type MetaFunction } from '@remix-run/node'
import { Flex } from '@ss/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Dashboard' }]
}

export const loader = () => {
  return redirect('/deliveries')
}

const Page = () => {
  return <Flex direction="column" gap={32}></Flex>
}

export default Page
