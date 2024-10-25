import '../src'

import React from 'react'
import type { Preview } from '@storybook/react'

import { UiProvider } from '../src/components'

const preview: Preview = {
  decorators: [
    (Story) => {
      return <UiProvider Link={<a />}>{<Story />}</UiProvider>
    },
  ],
}

export default preview
