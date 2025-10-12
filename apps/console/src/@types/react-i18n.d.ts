import type { I18nContextValue } from '@starter/react-i18n'

import type { I18nConsole } from '~/i18n'

declare module '@starter/react-i18n' {
	export function useI18n(): I18nContextValue<I18nConsole>
}
