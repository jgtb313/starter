import type { Locale } from '@starter/schema'
import { createI18n } from '@starter/i18n'

import { type PropsWithChildren, useMemo, useState } from 'react'

import { I18nContext } from '@/react-i18n.context'
import type { I18nProviderProps } from '@/react-i18n.provider.types'

export const I18nProvider = ({
	dict,
	defaultLocale = 'en',
	children,
}: PropsWithChildren<I18nProviderProps>) => {
	const [internalLocale, setInternalLocale] = useState<Locale>(
		(localStorage.getItem('locale') as Locale) ?? defaultLocale,
	)
	const i18n = useMemo(
		() => createI18n(dict, internalLocale),
		[
			dict,
			internalLocale,
		],
	)

	const changeLocale = (locale: Locale) => {
		localStorage.setItem('locale', locale)
		setInternalLocale(locale)
	}

	return (
		<I18nContext.Provider
			value={{
				t: i18n,
				locale: internalLocale,
				changeLocale,
			}}
		>
			{children}
		</I18nContext.Provider>
	)
}
