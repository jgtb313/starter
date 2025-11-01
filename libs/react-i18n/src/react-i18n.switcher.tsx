import type { Locale } from '@starter/schema'
import { Select } from '@starter/ui'

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
		<Select
			onValueChange={(value) => changeLocale(value as Locale)}
			value={locale}
		>
			<Select.Trigger className="w-[200px]">
				<Select.Value placeholder="Select language" />
			</Select.Trigger>
			<Select.Content>
				{languages.map((lang) => (
					<Select.Item
						key={lang.value}
						value={lang.value}
					>
						{lang.flag} {lang.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	)
}
