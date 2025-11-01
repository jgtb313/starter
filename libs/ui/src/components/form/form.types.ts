export type FormProps = {
	onSubmit?: React.ComponentProps<'form'>['onSubmit']
}

export type FormItemProps = {
	className?: string
	label?: string
	error?: string
}
