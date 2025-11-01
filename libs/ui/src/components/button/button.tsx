import * as React from 'react'

import type { ButtonProps } from '@/components/button/button.types'
import { Button as ShadcnButton } from '@/shadcn/button'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant,
			size,
			children,
			disabled,
			type = 'button',
			onClick,
			onFocus,
			onBlur,
			className,
		},
		ref,
	) => {
		const [] = React.useState()
		return (
			<ShadcnButton
				className={className}
				disabled={disabled}
				onBlur={onBlur}
				onClick={onClick}
				onFocus={onFocus}
				ref={ref}
				size={size}
				type={type}
				variant={variant}
			>
				{children}
			</ShadcnButton>
		)
	},
)

Button.displayName = 'Button'
