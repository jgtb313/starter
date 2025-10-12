import type { Locale } from '@starter/schema'
import type { I18nDict, InferI18n } from '@starter/i18n'

import { createContext, useContext } from 'react'

type I18nContextValue<T extends I18nDict> = {
	t: InferI18n<T>
	currentLocale: Locale
	setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nContextValue<I18nDict> | null>(
	null,
)

export const useI18n = <T extends I18nDict>() => {
	const i18n = useContext(I18nContext) as I18nContextValue<T> | null

	if (!i18n) {
		throw new Error('useI18n must be used within an I18nProvider')
	}

	return i18n
}
