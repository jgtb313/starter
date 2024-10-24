import { PropsWithChildren } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'

import { Provider } from '@/components'

export const render = ({ children }: PropsWithChildren) => {
  return testingLibraryRender(<Provider Link={(props: any) => <a {...props} />}>{children}</Provider>)
}
