import type { PropsWithChildren } from 'react'

import type { TooltipProps } from '@/components/tooltip/tooltip.types'
import {
	Tooltip as ShadcnTooltip,
	TooltipContent as ShadcnTooltipContent,
	TooltipTrigger as ShadcnTooltipTrigger,
} from '@/shadcn/tooltip'

export const Tooltip = ({
	className,
	content,
	side = 'top',
	sideOffset = 0,
	children,
}: PropsWithChildren<TooltipProps>) => {
	return (
		<ShadcnTooltip>
			<ShadcnTooltipTrigger
				asChild
				className={className}
			>
				{children}
			</ShadcnTooltipTrigger>

			<ShadcnTooltipContent
				side={side}
				sideOffset={sideOffset}
			>
				{content}
			</ShadcnTooltipContent>
		</ShadcnTooltip>
	)
}
