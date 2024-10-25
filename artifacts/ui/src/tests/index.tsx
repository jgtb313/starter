import { PropsWithChildren } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'

import { UiProvider } from '@/components'

const Link = () => <a />

export const render = ({ children }: PropsWithChildren) => {
  return testingLibraryRender(<UiProvider Link={10}>{children}</UiProvider>)
}
