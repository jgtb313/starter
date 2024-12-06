import { type MetaFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { Breadcrumbs, Flex, BreadcrumbsProps } from '@starter/ui'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Account` }]
}

const Page = () => {
  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Account' }]

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs items={breadcrumbsItems} />
    </Flex>
  )
}

export default Page
