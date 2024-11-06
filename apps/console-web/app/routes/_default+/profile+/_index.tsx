import { type MetaFunction } from '@remix-run/node'
import { Breadcrumbs, Flex, BreadcrumbsProps, TabsProps } from '@ss/components'

import { useRouter } from '~/hooks'
import { Heading } from '~/common'
import { UserProfile } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Minha conta' }]
}

type Page = {
  query: {
    tab?: string
  }
}

const Page = () => {
  const router = useRouter<Page['query']>()

  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Minha conta' }]

  const handleTabChange: TabsProps['onChange'] = (value) => {
    router.update({ tab: value })
  }

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Flex direction="column" gap={16}>
        <Heading title="Minha conta" description="Atualize seus dados pessoais e ajuste as configurações de segurança da sua conta." />

        <UserProfile value={router.query.tab ?? 'informations'} onChange={handleTabChange} />
      </Flex>
    </Flex>
  )
}

export default Page
