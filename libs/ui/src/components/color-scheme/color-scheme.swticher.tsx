import { useColorScheme } from '@/components/color-scheme/color-scheme.context'
import type { ColorScheme } from '@/components/color-scheme/color-scheme.context.types'
import { NativeSelect } from '@/components/native-select/native-select'

export const ColorSchemeSwitcher = () => {
	const { colorScheme, changeColorScheme } = useColorScheme()

	const options: {
		value: ColorScheme
		label: string
	}[] = [
		{
			value: 'system',
			label: 'System',
		},
		{
			value: 'light',
			label: 'Light',
		},
		{
			value: 'dark',
			label: 'Dark',
		},
	]

	return (
		<NativeSelect
			value={colorScheme}
			onChange={(e) => changeColorScheme(e.target.value as ColorScheme)}
		>
			{options.map((opt) => (
				<NativeSelect.Option
						key={opt.value}
						value={opt.value}
					>
						{opt.label}
					</NativeSelect.Option>
				))}
		</NativeSelect>
	)
}
