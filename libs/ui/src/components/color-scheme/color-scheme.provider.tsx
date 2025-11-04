import { type PropsWithChildren, useLayoutEffect, useState } from 'react'

import { ColorSchemeContext } from '@/components/color-scheme/color-scheme.context'
import type { ColorScheme } from '@/components/color-scheme/color-scheme.context.types'
import type { ColorSchemeProviderProps } from '@/components/color-scheme/color-scheme.provider.types'

export const ColorSchemeProvider = ({
	defaultColorScheme = 'light',
	children,
}: PropsWithChildren<ColorSchemeProviderProps>) => {
	const localStorageColorScheme = localStorage.getItem(
		'colorScheme',
	) as ColorScheme
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		localStorageColorScheme ?? defaultColorScheme,
	)

	const changeColorScheme = (colorScheme: ColorScheme) => {
		setColorScheme(colorScheme)
		localStorage.setItem('colorScheme', colorScheme)
	}

	useLayoutEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (colorScheme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(colorScheme)
	}, [
		colorScheme,
	])

	return (
		<ColorSchemeContext.Provider
			value={{
				colorScheme,
				changeColorScheme,
			}}
		>
			{children}
		</ColorSchemeContext.Provider>
	)
}
