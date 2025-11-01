import * as React from 'react'

import type { FlexProps } from './flex.types'

import { cn } from '../../shadcn/shadcn.utils'

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			children,
			direction = 'row',
			align,
			justify,
			gap,
			wrap,
			className,
			...props
		},
		ref,
	) => {
		const directionClasses = {
			row: 'flex-row',
			col: 'flex-col',
			'row-reverse': 'flex-row-reverse',
			'col-reverse': 'flex-col-reverse',
		}

		const alignClasses = {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			stretch: 'items-stretch',
			baseline: 'items-baseline',
		}

		const justifyClasses = {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
			around: 'justify-around',
			evenly: 'justify-evenly',
		}

		const gapClasses = {
			'0': 'gap-0',
			'1': 'gap-1',
			'2': 'gap-2',
			'3': 'gap-3',
			'4': 'gap-4',
			'5': 'gap-5',
			'6': 'gap-6',
			'8': 'gap-8',
			'10': 'gap-10',
			'12': 'gap-12',
			'16': 'gap-16',
		}

		const wrapClasses = {
			wrap: 'flex-wrap',
			nowrap: 'flex-nowrap',
			'wrap-reverse': 'flex-wrap-reverse',
		}

		return (
			<div
				className={cn(
					'flex',
					directionClasses[direction],
					align && alignClasses[align],
					justify && justifyClasses[justify],
					gap && gapClasses[gap],
					wrap && wrapClasses[wrap],
					className,
				)}
				ref={ref}
				{...props}
			>
				{children}
			</div>
		)
	},
)

Flex.displayName = 'Flex'
