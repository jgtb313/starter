import { type MetaFunction } from '@remix-run/node'
import { Breadcrumbs, Flex, BreadcrumbsProps, TabsProps } from '@ss/components'

import { useRouter } from '~/hooks'
import { Heading } from '~/common'
import { Settings } from '~/components/Settings'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Configurações' }]
}

type Page = {
  query: {
    tab?: string
  }
}

const Page = () => {
  const router = useRouter<Page['query']>()

  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Configurações' }]

  const handleTabChange: TabsProps['onChange'] = (value) => {
    router.update({ tab: value })
  }

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Flex direction="column" gap={16}>
        <Heading title="Configurações" description="Gerencie suas lojas e equipe dentro da sua organização." />

        <Settings value={router.query.tab} onChange={handleTabChange} />
      </Flex>
    </Flex>
  )
}

export default Page
