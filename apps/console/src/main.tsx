import { I18nProvider } from '@starter/react-i18n'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { reportWebVitals } from '@/report-web-vitals'
import { routeTree } from '@/routeTree.gen'

import { i18nDict } from './~i18n/console.i18n'

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById('app')

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<I18nProvider
				dict={i18nDict}
				locale='pt-BR'
			>
				<RouterProvider router={router} />
			</I18nProvider>
		</StrictMode>,
	)
}

reportWebVitals()
