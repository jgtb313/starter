import type { Locale } from '@starter/schema'
import { NativeSelect } from '@starter/ui'

import { useI18n } from './react-i18n.context'

type I18nSwitcherProps = {}

export const I18nSwitcher = ({}: I18nSwitcherProps) => {
	const { locale, changeLocale } = useI18n()

	const languages: {
		value: Locale
		label: string
		flag: string
	}[] = [
		{
			value: 'en',
			label: 'English',
			flag: '🇺🇸',
		},
		{
			value: 'es',
			label: 'Español',
			flag: '🇪🇸',
		},
		{
			value: 'pt-BR',
			label: 'Português (Brasil)',
			flag: '🇧🇷',
		},
	]

	return (
		<NativeSelect
			value={locale}
			onChange={(e) => changeLocale(e.target.value as Locale)}
		>
			{languages.map((lang) => (
				<NativeSelect.Option
					key={lang.value}
					value={lang.value}
				>
					{lang.flag} {lang.label}
				</NativeSelect.Option>
			))}
		</NativeSelect>
	)
}
