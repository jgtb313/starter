import * as React from 'react'

import type {
	CardContentProps,
	CardDescriptionProps,
	CardFooterProps,
	CardHeaderProps,
	CardRootProps,
	CardTitleProps,
} from './card.types'

import {
	Card as ShadcnCard,
	CardContent as ShadcnCardContent,
	CardDescription as ShadcnCardDescription,
	CardFooter as ShadcnCardFooter,
	CardHeader as ShadcnCardHeader,
	CardTitle as ShadcnCardTitle,
} from '../../shadcn/card'

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
	({ children, id, className }, ref) => (
		<ShadcnCard
			className={className}
			id={id}
			ref={ref}
		>
			{children}
		</ShadcnCard>
	),
)
CardRoot.displayName = 'CardRoot'

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ children, className }, ref) => (
		<ShadcnCardHeader
			className={className}
			ref={ref}
		>
			{children}
		</ShadcnCardHeader>
	),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
	({ children, className }, ref) => (
		<ShadcnCardTitle
			className={className}
			ref={ref}
		>
			{children}
		</ShadcnCardTitle>
	),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	CardDescriptionProps
>(({ children, className }, ref) => (
	<ShadcnCardDescription
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardDescription>
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ children, className }, ref) => (
		<ShadcnCardContent
			className={className}
			ref={ref}
		>
			{children}
		</ShadcnCardContent>
	),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ children, className }, ref) => (
		<ShadcnCardFooter
			className={className}
			ref={ref}
		>
			{children}
		</ShadcnCardFooter>
	),
)
CardFooter.displayName = 'CardFooter'

export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Title: CardTitle,
	Description: CardDescription,
	Content: CardContent,
	Footer: CardFooter,
})
