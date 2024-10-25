import { addons } from '@storybook/manager-api'
import config from '@starter/config'

import theme from './theme'

const link = document.createElement('link')
link.setAttribute('rel', 'shortcut icon')
link.setAttribute('href', config.logo.lightSymbol)
document.head.appendChild(link)

addons.setConfig({
  theme,
})
