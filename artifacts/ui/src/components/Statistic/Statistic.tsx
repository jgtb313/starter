import { SimpleGrid, Paper, Group } from '@mantine/core'
import { isNumber } from '@starter/shared'

import { Icon } from '../Icon'
import { Typography } from '../Typography'
import { StatisticStyles } from './Statistic.styles'
import { StatisticProps } from './Statistic.types'

export const Statistic = ({ items = [], ...props }: StatisticProps) => {
  const styles = StatisticStyles(props)

  return (
    <SimpleGrid classNames={{ root: styles.root() }} {...props}>
      {items.map((item) => (
        <Paper key={item.title} p="md" radius="md" withBorder>
          <Group justify="space-between">
            <Typography tt="uppercase" fw={700} size="xs" c="dimmed">
              {item.title}
            </Typography>

            {item.icon && <Icon name={item.icon} width={18} strokeWidth={1.5} />}
          </Group>

          {isNumber(item.value) && (
            <Group align="flex-end" gap="xs" mt={26}>
              <Typography fw={700} fz={24} lh={1}>
                {item.value}
              </Typography>

              <Typography className="flex items-center" c={item.valueChangeMode === 'up' ? 'teal' : 'red'} fz="sm" fw={500} lh={1}>
                <span>{item.valueChange}%</span>

                <Icon name={item.valueChangeMode === 'up' ? 'IconArrowUpRight' : 'IconArrowDownRight'} width={18} strokeWidth={1.5} />
              </Typography>
            </Group>
          )}

          {item.description && (
            <Typography fz="xs" c="dimmed" mt={7}>
              {item.description}
            </Typography>
          )}
        </Paper>
      ))}
    </SimpleGrid>
  )
}
