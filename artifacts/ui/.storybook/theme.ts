import { create } from '@storybook/theming'
import config from '@starter/config'

export default create({
  base: 'dark',
  brandTitle: config.name,
  brandImage: config.logo.light,
  brandTarget: '_blank',
})
