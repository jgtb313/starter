import { type MetaFunction } from '@remix-run/node'
import { ListInvoiceInput } from '@ss/schema'
import { Breadcrumbs, Flex, Button, useMount, useWatch, BreadcrumbsProps } from '@ss/components'

import { calculateOffset, calculatePage } from '~/support/utilities'
import { useRouter, useStoreChange } from '~/hooks'
import { useApp, useInvoice } from '~/stores'
import { Heading } from '~/common'
import { InvoiceList, batchInvoiceFormDrawer, InvoiceListProps } from '~/components'

export const meta: MetaFunction = () => {
  return [{ title: 'SmartStock | Notas' }]
}

type PageProps = {
  query: Omit<ListInvoiceInput, 'storeId'>
}

const Page = () => {
  const router = useRouter<PageProps['query']>()
  const { store } = useApp()
  const { fetchInvoices, invoices, loadingInvoices } = useInvoice()

  const breadcrumbsItems: BreadcrumbsProps['items'] = [{ label: 'Dashboard', href: '/' }, { label: 'Notas' }]

  // const searchValue: SearchProps<PageProps['query']>['value'] = {
  //   ...router.query
  // }

  const handleFetch = () => {
    fetchInvoices({ storeId: store.id, ...router.query })
  }

  // const handleSearchChange: SearchProps<PageProps['query']>['onChange'] = (value) => {
  //   router.update(value)
  // }

  const handlePageChange: InvoiceListProps['onPageChange'] = (value) => {
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

      <Heading title="Notas" description="Faça upload das suas notas e gerencie as entregas." total={invoices?.total ?? 0}>
        <Button size="lg" onClick={() => batchInvoiceFormDrawer.open({ onSuccess: handleFetch })}>
          Adicionar notas
        </Button>
      </Heading>

      <InvoiceList
        value={{ page: calculatePage(router.query.offset), total: invoices?.total }}
        items={invoices?.values}
        loading={loadingInvoices}
        onPageChange={handlePageChange}
        onDelete={handleFetch}
      />
    </Flex>
  )
}

export default Page
