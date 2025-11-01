import type { Locale } from '@starter/schema'
import type { I18nDict } from '@starter/i18n'

export type I18nProviderProps = {
	dict: I18nDict
	locale?: Locale
}
