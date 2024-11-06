import { Flex, List as Component } from '@mantine/core'

import { Typography } from '../Typography'
import { Icon } from '../Icon'
import { ListStyles } from './List.styles'
import { ListProps, ListItemProps, ListEmptyProps } from './List.types'

const ListEmpty = ({ emptyMessage = 'Vazio', EmptyIcon = 'IconFile' }: ListEmptyProps) => {
  return (
    <Flex h="100%" align="center" justify="center">
      <Flex direction="column" align="center" justify="center" gap={16}>
        <Icon name={EmptyIcon} width={30} height={30} />

        <Typography size="md">{emptyMessage}</Typography>
      </Flex>
    </Flex>
  )
}

export const List = <T,>({ items, type, emptyMessage, EmptyIcon, renderItem, ...props }: ListProps<T>) => {
  const styles = ListStyles(props)

  return (
    <>
      {!!items?.length && (
        <Component {...props} classNames={{ root: styles.root() }} listStyleType={type}>
          {items?.map((item, index) => (
            <Component.Item key={index} classNames={{ itemWrapper: 'w-full', item: 'w-full', itemLabel: 'w-full' }}>
              {renderItem(item, index)}
            </Component.Item>
          ))}
        </Component>
      )}

      {!items?.length && <ListEmpty emptyMessage={emptyMessage} EmptyIcon={EmptyIcon} />}
    </>
  )
}

List.Item = ({ size, title, content, startContent, endContent }: ListItemProps) => {
  return (
    <Flex direction="row" align="center" justify="space-between">
      <Flex align="center" gap={8}>
        {startContent}

        <Flex direction="column" gap={4}>
          <Typography size={size}>{title}</Typography>

          {content}
        </Flex>
      </Flex>

      {endContent}
    </Flex>
  )
}
