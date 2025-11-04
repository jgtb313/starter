import { forwardRef, type PropsWithChildren } from 'react'

import type { FlexProps } from '@/components/flex/flex.types'
import { cva } from 'class-variance-authority'
import { cn } from '@/support/utils'

const flexVariants = cva('flex', {
	variants: {
		direction: {
			row: 'flex-row',
			col: 'flex-col',
		},
		justify: {
			start: 'justify-start',
			end: 'justify-end',
			center: 'justify-center',
			between: 'justify-between',
			around: 'justify-around',
			evenly: 'justify-evenly',
		},
		align: {
			start: 'items-start',
			end: 'items-end',
			center: 'items-center',
			between: 'items-between',
			around: 'items-around',
			evenly: 'items-evenly',
		},
		gap: {
			'0': 'gap-0',
			'1': 'gap-1',
			'2': 'gap-2',
			'3': 'gap-3',
			'4': 'gap-4',
			'5': 'gap-5',
			'6': 'gap-6',
			'7': 'gap-7',
			'8': 'gap-8',
			'9': 'gap-9',
			'10': 'gap-10',
			'11': 'gap-11',
			'12': 'gap-12',
		},
	},
})

export const Flex = forwardRef<HTMLDivElement, PropsWithChildren<FlexProps>>(
	(
		{
			className,
			direction = 'row',
			justify = 'start',
			align = 'start',
			gap = '0',
			children,
		},
		ref,
	) => {
		const classes = flexVariants({
			direction,
			justify,
			align,
			gap,
		})

		return (
			<div
				className={cn(classes, className)}
				ref={ref}
			>
				{children}
			</div>
		)
	},
)
