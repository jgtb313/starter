import { useI18n } from '@starter/react-i18n'
import { Card, Flex } from '@starter/ui'

import { createFileRoute, Link } from '@tanstack/react-router'
import { FaReact } from 'react-icons/fa'

import { ForgotPasswordForm } from '@/components/forgot-password-form/forgot-password-form'

export const Route = createFileRoute('/_public/forgot-password')({
	component: RouteComponent,
})

function RouteComponent() {
	const i18n = useI18n()

	return (
		<Flex
			className="w-full max-w-[500px]"
			justify="center"
		>
			<Flex
				className="w-full"
				direction="col"
				gap="6"
			>
				<Flex justify="center">
					<FaReact className="h-16 w-16 text-primary" />
				</Flex>
				<Card>
					<Card.Header>
						<Flex
							direction="col"
							gap="1"
						>
							<Card.Title className="text-center text-2xl">
								{i18n.t.forgotPassword()}
							</Card.Title>
							<Card.Description className="text-center">
								{i18n.t.enterEmailToReset()}
							</Card.Description>
						</Flex>
					</Card.Header>

					<Card.Content>
						<ForgotPasswordForm />
					</Card.Content>

					<Card.Footer>
						<Flex
							className="w-full"
							direction="col"
							gap="2"
							justify="center"
						>
							<p className="text-center text-muted-foreground text-sm">
								<Link
									className="text-primary underline-offset-4 hover:underline"
									to="/sign-in"
								>
									{i18n.t.signIn()}
								</Link>
							</p>
						</Flex>
					</Card.Footer>
				</Card>
			</Flex>
		</Flex>
	)
}
