import { ThemeProps } from '@starter/ui'

export type BrandProps = {
  to?: string
  width?: number
  symbol?: boolean
}

export type BrandIconProps = {
  width?: BrandProps['width']
  colorScheme: ThemeProps['colorScheme']
}
