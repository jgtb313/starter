import { forwardRef, type PropsWithChildren } from 'react'

import type {
	CardProps,
	CardHeaderProps,
	CardTitleProps,
	CardDescriptionProps,
	CardActionProps,
	CardContentProps,
	CardFooterProps,
} from './card.types'
import {
	Card as ShadcnCard,
	CardHeader as ShadcnCardHeader,
	CardTitle as ShadcnCardTitle,
	CardDescription as ShadcnCardDescription,
	CardAction as ShadcnCardAction,
	CardContent as ShadcnCardContent,
	CardFooter as ShadcnCardFooter,
} from '@/shadcn/card'

const WrappedCard = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
	({ className, children }, ref) => (
		<ShadcnCard
			className={className}
			ref={ref}
		>
			{children}
		</ShadcnCard>
	),
)

const WrappedCardHeader = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardHeaderProps>
>(({ className, children }, ref) => (
	<ShadcnCardHeader
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardHeader>
))

const WrappedCardTitle = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardTitleProps>
>(({ className, children }, ref) => (
	<ShadcnCardTitle
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardTitle>
))

const WrappedCardDescription = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardDescriptionProps>
>(({ className, children }, ref) => (
	<ShadcnCardDescription
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardDescription>
))

const WrappedCardAction = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardActionProps>
>(({ className, children }, ref) => (
	<ShadcnCardAction
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardAction>
))

const WrappedCardContent = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardContentProps>
>(({ className, children }, ref) => (
	<ShadcnCardContent
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardContent>
))

const WrappedCardFooter = forwardRef<
	HTMLDivElement,
	PropsWithChildren<CardFooterProps>
>(({ className, children }, ref) => (
	<ShadcnCardFooter
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnCardFooter>
))

export const Card = Object.assign(WrappedCard, {
	Header: WrappedCardHeader,
	Title: WrappedCardTitle,
	Description: WrappedCardDescription,
	Action: WrappedCardAction,
	Content: WrappedCardContent,
	Footer: WrappedCardFooter,
})
