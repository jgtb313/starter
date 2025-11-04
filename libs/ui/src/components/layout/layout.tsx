import { cva } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'

import type { LayoutContentProps, LayoutRootProps } from './layout.types'

const layoutRootVariants = cva('flex flex-col min-h-screen', {
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
	centered,
	children,
}: PropsWithChildren<LayoutContentProps>) => {
	const classes = layoutRootVariants({
		centered,
	})

	return <div className={classes}>{children}</div>
}

export const Layout = Object.assign(LayoutRoot, {
	Content: LayoutContent,
})
