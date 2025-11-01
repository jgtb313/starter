import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import '@starter/ui/index.css'

import { I18nProvider } from '@starter/react-i18n'
import { UIProvider } from '@starter/ui'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { reportWebVitals } from '@/report-web-vitals'
import { routeTree } from '@/routeTree.gen'

import { i18nDict } from '~/i18n'

const queryClient = new QueryClient()

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
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
			<QueryClientProvider client={queryClient}>
				<I18nProvider
					defaultLocale="en"
					dict={i18nDict}
				>
					<UIProvider
						colorScheme={{
							defaultColorScheme: 'dark',
						}}
					>
						<RouterProvider router={router} />
					</UIProvider>
				</I18nProvider>
			</QueryClientProvider>
		</StrictMode>,
	)
}

reportWebVitals()
