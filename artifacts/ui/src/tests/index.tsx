import { PropsWithChildren } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'

import { UiProvider } from '@/components'

export const render = ({ children }: PropsWithChildren) => {
  return testingLibraryRender(<UiProvider Link={() => <a />}>{children}</UiProvider>)
}
