import * as React from "react"

import type { SeparatorProps } from "./separator.types"

import { Separator as ShadcnSeparator } from "../../shadcn/separator"

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
	({ orientation, decorative, className }, ref) => {
		return (
			<ShadcnSeparator
				ref={ref}
				orientation={orientation}
				decorative={decorative}
				className={className}
			/>
		)
	},
)

Separator.displayName = "Separator"



