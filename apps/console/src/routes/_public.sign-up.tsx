import { Card, Flex } from '@starter/ui'

import { createFileRoute, Link } from '@tanstack/react-router'
import { FaReact } from 'react-icons/fa'

import { SignUpForm } from '@/components/sign-up-form/sign-up-form'

export const Route = createFileRoute('/_public/sign-up')({
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
							<Card.Title className="text-center text-2xl">Sign Up</Card.Title>
							<Card.Description className="text-center">
								Enter your email and password to sign up to your account
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
