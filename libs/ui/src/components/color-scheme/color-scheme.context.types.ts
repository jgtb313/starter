export type ColorScheme = 'light' | 'dark' | 'system'

export type ColorSchemeContextType = {
	colorScheme: ColorScheme
	changeColorScheme: (colorScheme: ColorScheme) => void
}
