import * as React from "react"

import type { InputProps } from "./input.types"

import { Input as ShadcnInput } from "../../shadcn/input"

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			type,
			disabled,
			placeholder,
			value,
			onChange,
			onFocus,
			onBlur,
			name,
			id,
			required,
			className,
		},
		ref,
	) => {
		return (
			<ShadcnInput
				ref={ref}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				name={name}
				id={id}
				required={required}
				className={className}
			/>
		)
	},
)

Input.displayName = "Input"


