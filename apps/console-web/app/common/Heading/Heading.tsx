import { PropsWithChildren } from 'react'
import { Flex, Pill, Typography } from '@ss/components'
import { isNumber } from '@ss/shared'

import { HeadingProps } from './Heading.types'

export const Heading = ({ title, description, total, children }: PropsWithChildren<HeadingProps>) => {
  return (
    <Flex direction="row" justify="space-between">
      <Flex direction="column" gap={8}>
        <Flex direction="row" align="center" gap={8}>
          <Typography component="h3" size="1.5rem" fw={600}>
            {title}
          </Typography>

          {isNumber(total) && <Pill>{total.toLocaleString('pt-BR')}</Pill>}
        </Flex>

        {description && <Typography>{description}</Typography>}
      </Flex>

      {children}
    </Flex>
  )
}
