import { type MetaFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { Breadcrumbs, Flex, BreadcrumbsProps } from '@starter/ui'

export const meta: MetaFunction = () => {
  return [{ title: `${config.name} | Settings` }]
}

type Page = {
  query: {
    tab?: string
  }
}

const Page = () => {
  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Settings' }]

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs items={breadcrumbsItems} />
    </Flex>
  )
}

export default Page
