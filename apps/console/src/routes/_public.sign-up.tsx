import { useI18n } from '@starter/react-i18n'
import { Card, Flex } from '@starter/ui'

import { createFileRoute, Link } from '@tanstack/react-router'
import { FaReact } from 'react-icons/fa'

import { SignUpForm } from '@/components/sign-up-form/sign-up-form'

export const Route = createFileRoute('/_public/sign-up')({
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
					<div className="h-16 w-16 text-primary">
						<FaReact className="h-16 w-16" />
					</div>
				</Flex>
				<Card>
					<Card.Header>
						<Flex
							direction="col"
							gap="1"
						>
							<Card.Title className="text-center text-2xl">
								{i18n.t.signUp()}
							</Card.Title>
							<Card.Description className="text-center">
								{i18n.t.enterEmailPasswordToSignUp()}
							</Card.Description>
						</Flex>
					</Card.Header>
					<Card.Content>
						<SignUpForm />
					</Card.Content>
					<Card.Footer>
						<Flex
							className="w-full"
							justify="center"
						>
							<p className="text-center text-muted-foreground text-sm">
								{i18n.t.alreadyHaveAccount()}{' '}
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
