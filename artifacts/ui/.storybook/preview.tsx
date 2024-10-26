import '../src'

import React from 'react'
import type { Preview } from '@storybook/react'

import { UiProvider } from '../src/components'

const Link = (props) => <a {...props} />

const preview: Preview = {
  decorators: [
    (Story) => {
      return <UiProvider Link={Link}>{<Story />}</UiProvider>
    },
  ],
}

export default preview
