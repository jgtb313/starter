import * as React from 'react'

import type { CheckboxProps } from './checkbox.types'

import { Checkbox as ShadcnCheckbox } from '../../shadcn/checkbox'

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
	(
		{ checked, onCheckedChange, disabled, required, name, id, className },
		ref,
	) => {
		return (
			<ShadcnCheckbox
				checked={checked}
				className={className}
				disabled={disabled}
				id={id}
				name={name}
				onCheckedChange={onCheckedChange}
				ref={ref}
				required={required}
			/>
		)
	},
)

Checkbox.displayName = 'Checkbox'
