import type { I18nContextProps } from '@starter/react-i18n'

import type { I18nConsole } from '~/i18n'

declare module '@starter/react-i18n' {
	export function useI18n(): I18nContextProps<I18nConsole>
}
