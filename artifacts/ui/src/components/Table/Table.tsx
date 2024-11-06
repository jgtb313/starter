import { PropsWithChildren, useState } from 'react'
import { Flex, Stack, Group, Center, Table as Component, UnstyledButton, Pagination, PaginationProps } from '@mantine/core'

import { Dropdown, DropdownProps } from '../Dropdown'
import { Spinning } from '../Spinning'
import { Typography } from '../Typography'
import { Icon } from '../Icon'
import { Status, StatusEnum } from '../Status'
import { TableStyles } from './Table.styles'
import { TableProps } from './Table.types'

type ThProps = PropsWithChildren<{
  name: string
  sorter?: boolean
  sorted?: boolean
  reversed?: boolean
  onSortChange?: (value?: string) => void
}>

const setupThIsSorted = (name: string, value?: string) => {
  if (!value) {
    return false
  }

  return value.split(':')?.[0] === name
}

const setupThIsReversed = (name: string, value?: string) => {
  if (!value) {
    return false
  }

  return value.split(':')?.[0] === name && value.split(':')?.[1] === 'descend'
}

const Th = ({ name, sorter = false, sorted = false, reversed = false, onSortChange, children }: ThProps) => {
  const styles = TableStyles({ sorter, sorted })

  const handleSortChange = () => {
    if (sorted && !reversed) {
      onSortChange?.(undefined)

      return
    }

    onSortChange?.(`${name}:${reversed ? 'ascend' : 'descend'}`)
  }

  const SortIcon = () =>
    sorted ? (
      reversed ? (
        <Icon name="IconChevronUp" strokeWidth={1.5} width={15} />
      ) : (
        <Icon name="IconChevronDown" strokeWidth={1.5} width={15} />
      )
    ) : (
      <Icon name="IconCaretUpDown" strokeWidth={1.5} width={15} />
    )

  return (
    <Component.Th styles={{ th: { width: name === 'actions' ? '5%' : undefined } }} className={styles.th()} onClick={handleSortChange}>
      <UnstyledButton className="w-full cursor-default">
        <Group justify="space-between">
          <Typography size="md" fw={500}>
            {children}
          </Typography>

          {sorter && (
            <Center>
              <SortIcon />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </Component.Th>
  )
}

type EmptyProps = {
  colSpan: number
}

const Empty = ({ colSpan }: EmptyProps) => {
  return (
    <Component.Tr>
      <Component.Td colSpan={colSpan} ta="center">
        <Typography fw={500} ta="center">
          Nenhum resultado encontrado
        </Typography>
      </Component.Td>
    </Component.Tr>
  )
}

export const Table = <T,>({
  value = {},
  headers,
  items = [],
  pagination = true,
  loading = false,
  onSortChange,
  onPageChange,
  ...props
}: TableProps<T>) => {
  const styles = TableStyles(props)
  const [internalSort, setInternalSort] = useState(value?.sort)
  const page = value.page ? Number(value.page) : 1
  const totalPages = value.total ? Math.ceil(Number(value.total) / Number(value.rowsPerPage ?? 10)) : 1
  const colSpan = Object.keys(headers[0]).length

  const handleSortChange = (value?: string) => {
    setInternalSort(value)
    onSortChange?.(value)
  }

  const handlePageChange: PaginationProps['onChange'] = (value) => {
    onPageChange?.(value)
  }

  const head = headers.map((header, index) => (
    <Th
      key={index}
      name={header.key}
      sorter={header.sorter}
      sorted={setupThIsSorted(header.key, internalSort)}
      reversed={setupThIsReversed(header.key, internalSort)}
      onSortChange={header.sorter ? handleSortChange : undefined}
    >
      {header.key !== 'actions' && header.label}
    </Th>
  ))

  const body = items.length ? (
    items.map((item, index) => (
      <Component.Tr key={index}>
        {headers.map((header, index) =>
          header.key === 'actions' ? (
            <Component.Td key={index} width={5} align="center">
              <Dropdown trigger="hover" position="bottom-end" items={header.selector?.(item, index) as DropdownProps['items']}>
                <Icon className="cursor-pointer" name="IconDotsVertical" width={18} />
              </Dropdown>
            </Component.Td>
          ) : header.key === 'status' ? (
            <Component.Td key={index} width={30}>
              <Status variant={item[header.key as keyof T] as StatusEnum} />
            </Component.Td>
          ) : (
            <Component.Td key={index} width={header.width}>
              {header.selector ? (header.selector(item, index) as React.ReactNode) : (item[header.key as keyof T] as React.ReactNode)}
            </Component.Td>
          ),
        )}
      </Component.Tr>
    ))
  ) : (
    <Empty colSpan={colSpan} />
  )

  return (
    <Flex direction="column" gap={24}>
      <Spinning loading={loading}>
        <Stack className={styles.root()}>
          <Component classNames={{ table: styles.table(), thead: styles.thead() }} verticalSpacing="md" withRowBorders>
            <Component.Thead>
              <Component.Tr>{head}</Component.Tr>
            </Component.Thead>

            <Component.Tbody>{body}</Component.Tbody>
          </Component>
        </Stack>
      </Spinning>

      {pagination && (
        <Flex justify="end">
          <Pagination value={page} total={totalPages} size="lg" onChange={handlePageChange} />
        </Flex>
      )}
    </Flex>
  )
}
