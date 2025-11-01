import { cva } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'

import type { LayoutContentProps, LayoutRootProps } from './layout.types'

const classes = cva('flex flex-col items-center justify-center', {
	variants: {
		centered: {
			true: 'items-center justify-center',
		},
	},
})

const LayoutRoot = ({ children }: PropsWithChildren<LayoutRootProps>) => {
	return <main>{children}</main>
}

const LayoutContent = ({
	children,
	centered,
}: PropsWithChildren<LayoutContentProps>) => {
	return (
		<div
			className={classes({
				centered,
			})}
		>
			{children}
		</div>
	)
}

export const Layout = Object.assign(LayoutRoot, {
	Content: LayoutContent,
})
