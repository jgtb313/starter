import type { Locale } from '@starter/schema'
import { createI18n, type I18nDict } from '@starter/i18n'

import { type PropsWithChildren, useMemo, useState } from 'react'

import { I18nContext } from '@/react-i18n.context'

type I18nProviderProps = {
	dict: I18nDict
	locale?: Locale
}

export const I18nProvider = ({
	dict,
	locale = 'en',
	children,
}: PropsWithChildren<I18nProviderProps>) => {
	const [internalLocale, setInternalLocale] = useState<Locale>(locale)
	const i18n = useMemo(
		() => createI18n(dict, internalLocale),
		[
			dict,
			internalLocale,
		],
	)

	const setLocale = (locale: Locale) => {
		setInternalLocale(locale)
	}

	return (
		<I18nContext.Provider
			value={{
				t: i18n,
				currentLocale: internalLocale,
				setLocale,
			}}
		>
			{children}
		</I18nContext.Provider>
	)
}
