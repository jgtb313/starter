export interface InputProps {
	type?: string
	disabled?: boolean
	placeholder?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onFocus?: () => void
	onBlur?: () => void
	name?: string
	id?: string
	required?: boolean
	className?: string
}


