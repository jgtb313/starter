import { forwardRef } from 'react'

import type { SeparatorProps } from '@/components/separator/separator.types'
import { Separator as ShadcnSeparator } from '@/shadcn/separator'

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
	({ className, orientation = 'horizontal', decorative = true }, ref) => {
		return (
			<ShadcnSeparator
				className={className}
				orientation={orientation}
				decorative={decorative}
				ref={ref}
			/>
		)
	},
)
