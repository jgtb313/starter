import { type MetaFunction } from '@remix-run/node'
import { ListInvoiceInput } from '@ss/schema'
import { Breadcrumbs, Flex, useMount, useWatch, BreadcrumbsProps } from '@ss/components'

import { calculateOffset, calculatePage } from '~/support/utilities'
import { useRouter, useStoreChange } from '~/hooks'
import { useApp, useInventory } from '~/stores'
import { Heading } from '~/common'
import { InventoryList, InventoryListProps } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Inventários' }]
}

type PageProps = {
  query: Omit<ListInvoiceInput, 'storeId'>
}

const Page = () => {
  const router = useRouter<PageProps['query']>()
  const { store } = useApp()
  const { fetchInventories, inventories, loadingInventories } = useInventory()

  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Inventários' }]

  // const searchValue: SearchProps<PageProps['query']>['value'] = {
  //   ...router.query
  // }

  const handleFetch = () => {
    fetchInventories({ storeId: store.id, ...router.query })
  }

  // const handleSearchChange: SearchProps<PageProps['query']>['onSearch'] = (value) => {
  //   router.update(value)
  // }

  const handlePageChange: InventoryListProps['onPageChange'] = (value) => {
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
        title="Inventários"
        description="Confira seu estoque e acesse a lista de produtos disponíveis em seu inventário."
        total={inventories?.total ?? 0}
      />

      {/* <Search value={searchValue} placeholder="Pesquise pelo número da nota" onSearch={handleSearchChange} /> */}

      <InventoryList
        value={{ page: calculatePage(router.query.offset), total: inventories?.total }}
        items={inventories?.values}
        loading={loadingInventories}
        onPageChange={handlePageChange}
        onDelete={handleFetch}
      />
    </Flex>
  )
}

export default Page
