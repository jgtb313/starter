import { Moon, Sun } from 'lucide-react'

import { useColorScheme } from '@/components/color-scheme/color-scheme.context'
import type { ColorScheme } from '@/components/color-scheme/color-scheme.context.types'
import { NativeSelect } from '@/components/native-select/native-select'
import { Tooltip } from '@/components/tooltip/tooltip'
import { Button } from '@/shadcn/button'

type ColorSchemeSwitcherProps = {
	mode: 'select' | 'button'
}

const ColorSchemeSwitcherSelect = () => {
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
			onChange={(e) => changeColorScheme(e.target.value as ColorScheme)}
			value={colorScheme}
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

const ColorSchemeSwitcherButton = () => {
	const { colorScheme, changeColorScheme } = useColorScheme()

	return (
		<Tooltip
			content="Theme"
			side="bottom"
			sideOffset={4}
		>
			<Button
				onClick={() =>
					changeColorScheme(colorScheme === 'light' ? 'dark' : 'light')
				}
				size="icon"
				variant="outline"
			>
				{colorScheme === 'light' ? (
					<Sun className="h-[1.2rem] w-[1.2rem]" />
				) : (
					<Moon className="h-[1.2rem] w-[1.2rem]" />
				)}
			</Button>
		</Tooltip>
	)
}

export const ColorSchemeSwitcher = ({
	mode = 'select',
}: ColorSchemeSwitcherProps) => {
	if (mode === 'select') {
		return <ColorSchemeSwitcherSelect />
	}

	return <ColorSchemeSwitcherButton />
}
