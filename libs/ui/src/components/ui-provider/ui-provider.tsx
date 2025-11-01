import type { PropsWithChildren } from 'react'

import { ColorSchemeProvider } from '@/components/color-scheme/color-scheme.provider'
import type { UIProviderProps } from '@/components/ui-provider/ui-provider.types'

export const UIProvider = ({
	colorScheme,
	children,
}: PropsWithChildren<UIProviderProps>) => {
	return <ColorSchemeProvider {...colorScheme}>{children}</ColorSchemeProvider>
}
