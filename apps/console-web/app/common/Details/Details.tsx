import { List, Typography } from '@ss/components'

import { DetailsProps } from './Details.types'

export const Details = ({ items }: DetailsProps) => {
  return (
    <List
      spacing={20}
      items={items}
      renderItem={(item) => (
        <List.Item
          title={item.label}
          content={
            <Typography size="md" c="dimmed">
              {item.value}
            </Typography>
          }
        />
      )}
    />
  )
}
