import { forwardRef ,type PropsWithChildren } from 'react'

import type { ButtonProps } from '@/components/button/button.types'
import { Button as ShadcnButton } from '@/shadcn/button'

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
	(
		{
			className,
			size = 'default',
			type = 'button',
			variant = 'default',
			disabled = false,
			onClick,
			children,
		},
		ref,
	) => {
		return (
			<ShadcnButton
				className={className}
				disabled={disabled}
				onClick={onClick}
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
