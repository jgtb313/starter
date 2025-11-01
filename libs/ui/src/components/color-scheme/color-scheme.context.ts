import { createContext, useContext } from 'react'

import type { ColorSchemeContextType } from './color-scheme.context.types'

export const ColorSchemeContext = createContext<ColorSchemeContextType | null>(
	null,
)

export const useColorScheme = () => {
	const context = useContext(ColorSchemeContext)

	if (!context) {
		throw new Error('useColorScheme must be used within a ColorSchemeProvider')
	}

	return context
}
