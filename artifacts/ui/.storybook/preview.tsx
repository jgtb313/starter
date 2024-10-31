import '../src/styles.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/nprogress/styles.css'

import React from 'react'
import type { Preview } from '@storybook/react'

import { UiProvider } from '../src/components'

const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => <a ref={ref} {...props} />)

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Theme', 'Layout', 'Components', 'Form'],
      },
    },
  },

  decorators: [
    (Story) => {
      return <UiProvider Link={Link}>{<Story />}</UiProvider>
    },
  ],
}

export default preview
