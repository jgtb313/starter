import type { Locale } from '@starter/schema'
import { NativeSelect } from '@starter/ui'

import { useI18n } from './react-i18n.context'

type I18nSwitcherProps = {
	onLocaleChange?: (locale: Locale) => void
}

type I18nSwitcherOption = {
	value: Locale
	label: string
	flag: string
}

const options: I18nSwitcherOption[] = [
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

export const I18nSwitcher = ({ onLocaleChange }: I18nSwitcherProps) => {
	const { locale, changeLocale } = useI18n()

	const handleLocaleChange = (locale: Locale) => {
		changeLocale(locale)
		onLocaleChange?.(locale)
	}

	return (
		<NativeSelect
			onChange={(e) => handleLocaleChange(e.target.value as Locale)}
			value={locale}
		>
			{options.map((option) => (
				<NativeSelect.Option
					key={option.value}
					value={option.value}
				>
					{option.flag} {option.label}
				</NativeSelect.Option>
			))}
		</NativeSelect>
	)
}
