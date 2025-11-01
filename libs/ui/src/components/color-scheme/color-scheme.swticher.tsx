import { useColorScheme } from '@/components/color-scheme/color-scheme.context'
import type { ColorScheme } from '@/components/color-scheme/color-scheme.context.types'
import { Select } from '@/components/select/select'

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
		<Select
			onValueChange={(value) => changeColorScheme(value as ColorScheme)}
			value={colorScheme}
		>
			<Select.Trigger className="w-[180px]">
				<Select.Value placeholder="Select theme" />
			</Select.Trigger>
			<Select.Content>
				{options.map((opt) => (
					<Select.Item
						key={opt.value}
						value={opt.value}
					>
						{opt.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	)
}
