import * as React from 'react'

import { cn } from '../shadcn.utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className,
				)}
				ref={ref}
				type={type}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
