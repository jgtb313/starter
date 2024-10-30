import { PropsWithChildren } from 'react'
import { render as testingLibraryRender } from '@testing-library/react'

import { UiProvider } from '@/components'

const Link = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />

export const render = ({ children }: PropsWithChildren) => {
  return testingLibraryRender(<UiProvider Link={Link}>{children}</UiProvider>)
}
