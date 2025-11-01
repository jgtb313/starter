export type ButtonProps = {
	className?: string
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
	size?: 'default' | 'sm' | 'lg' | 'icon'
	children?: React.ReactNode
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	onFocus?: () => void
	onBlur?: () => void
}
