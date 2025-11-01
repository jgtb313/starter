import type { I18nDict } from '@starter/i18n'

import { createContext, useContext } from 'react'

import type { I18nContextProps } from '@/react-i18n.context.types'
export const I18nContext = createContext<I18nContextProps<I18nDict> | null>(
	null,
)

export const useI18n = <T extends I18nDict>() => {
	const i18n = useContext(I18nContext) as I18nContextProps<T> | null

	if (!i18n) {
		throw new Error('useI18n must be used within an I18nProvider')
	}

	return i18n
}
