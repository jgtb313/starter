import { I18nSwitcher } from '@starter/react-i18n'
import { ColorSchemeSwitcher, Flex, Layout } from '@starter/ui'

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Layout>
			<Flex
				align="center"
				className="absolute top-4 right-4"
				gap="4"
			>
				<ColorSchemeSwitcher mode="button" />
				<I18nSwitcher />
			</Flex>

			<Layout.Content centered>
				<Outlet />
			</Layout.Content>
		</Layout>
	)
}
