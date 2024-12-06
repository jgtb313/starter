import { config } from '@starter/config'
import { Flex } from '@mantine/core'

import { Link } from '../Link'
import { useTheme } from '../Theme'
import { BrandProps } from './Brand.types'

const BrandIcon = ({ width, symbol = false }: Pick<BrandProps, 'width' | 'symbol'>) => {
  const { colorScheme } = useTheme()

  if (symbol) {
    return <img src={colorScheme === 'dark' ? config.logo.darkSymbol : config.logo.lightSymbol} width={width} />
  }

  return <img src={colorScheme === 'dark' ? config.logo.dark : config.logo.light} width={width} />
}

export const Brand = ({ to, width = 350, symbol }: BrandProps) => {
  return to ? (
    <Flex justify="center">
      <Link href={to}>
        <BrandIcon width={width} symbol={symbol} />
      </Link>
    </Flex>
  ) : (
    <BrandIcon width={width} symbol={symbol} />
  )
}
