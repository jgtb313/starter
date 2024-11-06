import { type MetaFunction } from '@remix-run/node'
import { ListInvoiceInput } from '@ss/schema'
import { Breadcrumbs, Flex, useMount, useWatch, BreadcrumbsProps } from '@ss/components'

import { calculateOffset, calculatePage } from '~/support/utilities'
import { useRouter, useStoreChange } from '~/hooks'
import { useApp, useDelivery } from '~/stores'
import { Heading } from '~/common'
import { DeliveryList, DeliveryListProps } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Entregas' }]
}

type PageProps = {
  query: Omit<ListInvoiceInput, 'storeId'>
}

const Page = () => {
  const router = useRouter<PageProps['query']>()
  const { store } = useApp()
  const { fetchDeliveries, deliveries, loadingDeliveries } = useDelivery()

  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Entregas' }]

  // const searchValue: SearchProps<PageProps['query']>['value'] = {
  //   ...router.query
  // }

  const handleFetch = () => {
    fetchDeliveries({ storeId: store.id, ...router.query })
  }

  // const handleSearchChange: SearchProps<PageProps['query']>['onSearch'] = (value) => {
  //   router.update(value)
  // }

  const handlePageChange: DeliveryListProps['onPageChange'] = (value) => {
    router.update({ offset: calculateOffset(value) })
  }

  useWatch(() => {
    handleFetch()
  }, [router.path])

  useStoreChange({
    onChange: () => {
      handleFetch()
    }
  })

  useMount(() => {
    handleFetch()
  })

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs items={breadcrumbsItems} />

      <Heading
        title="Entregas"
        description="Visualize suas entregas e consulte o detalhes de cada entrega realizada."
        total={deliveries?.total ?? 0}
      />

      {/* <Search value={searchValue} placeholder="Pesquise pelo número da nota" onSearch={handleSearchChange} /> */}

      <DeliveryList
        value={{ page: calculatePage(router.query.offset), total: deliveries?.total }}
        items={deliveries?.values}
        loading={loadingDeliveries}
        onPageChange={handlePageChange}
        onDelete={handleFetch}
      />
    </Flex>
  )
}

export default Page
