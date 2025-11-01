import * as React from "react"

import type { LabelProps } from "./label.types"

import { Label as ShadcnLabel } from "../../shadcn/label"

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ children, htmlFor, className }, ref) => {
		return (
			<ShadcnLabel
				ref={ref}
				htmlFor={htmlFor}
				className={className}
			>
				{children}
			</ShadcnLabel>
		)
	},
)

Label.displayName = "Label"



