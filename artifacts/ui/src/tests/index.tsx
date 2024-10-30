import React, { PropsWithChildren } from 'react'

import { UiProvider } from '@/components'

const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => <a ref={ref} {...props} />)

export const TestProvider = ({ children }: PropsWithChildren) => <UiProvider Link={Link}>{children}</UiProvider>
