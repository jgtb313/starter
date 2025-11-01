import type { Locale } from '@starter/schema'
import type { I18nDict, InferI18n } from '@starter/i18n'

export type I18nContextProps<T extends I18nDict> = {
	t: Omit<InferI18n<T>, 'changeLocale'>
	locale: Locale
	changeLocale: (locale: Locale) => void
}
