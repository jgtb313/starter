import { Card, Flex } from '@starter/ui'

import { createFileRoute, Link } from '@tanstack/react-router'
import { FaReact } from 'react-icons/fa'

import { ForgotPasswordForm } from '@/components/forgot-password-form/forgot-password-form'

export const Route = createFileRoute('/_public/forgot-password')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Flex
			align="center"
			className="min-h-screen w-full bg-muted/40 p-4"
			justify="center"
		>
			<Flex
				className="w-full max-w-md"
				direction="col"
				gap="6"
			>
				<Flex
					align="center"
					justify="center"
				>
					<FaReact className="h-16 w-16 text-primary" />
				</Flex>
				<Card>
					<Card.Header>
						<Flex
							direction="col"
							gap="1"
						>
							<Card.Title className="text-center text-2xl">
								Forgot Password
							</Card.Title>
							<Card.Description className="text-center">
								Enter your email to reset your password
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
								Already have an account?{' '}
								<Link
									className="text-primary underline-offset-4 hover:underline"
									to="/sign-in"
								>
									Sign in
								</Link>
							</p>
						</Flex>
					</Card.Footer>
				</Card>
			</Flex>
		</Flex>
	)
}
