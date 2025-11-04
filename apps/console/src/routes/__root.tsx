import { setupZodI18n } from '@starter/schema'
import { useI18n } from '@starter/react-i18n'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

function RootLayout() {
	const { locale } = useI18n()

	useEffect(() => {
		setupZodI18n(locale)
	}, [
		locale,
	])

	return <Outlet />
}

export const Route = createRootRoute({
	component: RootLayout,
})
