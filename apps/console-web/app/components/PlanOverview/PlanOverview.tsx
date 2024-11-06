import { PlanInterval } from '@ss/schema'
import { Card, Flex, List, Icon, Typography } from '@ss/components'
import { formatToBRL } from '@ss/shared'

import { PlanOverviewProps } from './PlanOverview.types'

export const PlanOverview = ({ plan }: PlanOverviewProps) => {
  return (
    <Card padding="md" bordered>
      <Flex direction="column" gap={12}>
        <Typography size="lg" ta="center" mb={8}>
          {plan.name}
        </Typography>

        <Typography size="md">Valor: {formatToBRL(plan.amount)}</Typography>

        <Typography size="md">Periodicidade: {PlanInterval.schema[plan.interval]}</Typography>

        <List
          items={plan.features}
          renderItem={(feature) => (
            <List.Item size="sm" title={feature.description} startContent={<Icon name="CircleCheck" width={16} height={16} />} />
          )}
        />
      </Flex>
    </Card>
  )
}
