export type ButtonProps = {
	className?: string
	type?: 'button' | 'submit' | 'reset'
	size?: 'default' | 'sm' | 'lg' | 'icon'
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
	disabled?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
