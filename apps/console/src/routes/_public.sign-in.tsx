import { useI18n } from '@starter/react-i18n'
import { Button, Card, Flex, Separator } from '@starter/ui'

import { createFileRoute, Link } from '@tanstack/react-router'
import { FaKey, FaReact } from 'react-icons/fa'

import { SignInForm } from '@/components/sign-in-form/sign-in-form'
import { SocialSignOnForm } from '@/components/social-sign-on-form/social-sign-on-form'

export const Route = createFileRoute('/_public/sign-in')({
	component: RouteComponent,
})

function RouteComponent() {
	const i18n = useI18n()

	return (
		<Flex
			align="center"
			className="min-h-screen w-full max-w-[500px] bg-muted/40 p-4"
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
								{i18n.t.signIn()}
							</Card.Title>
							<Card.Description className="text-center">
								Enter your email and password to sign in to your account
							</Card.Description>
						</Flex>
					</Card.Header>

					<Card.Content>
						<SignInForm />

						<Flex
							className="relative my-4"
							direction="col"
						>
							<Flex
								align="center"
								className="absolute inset-0"
							>
								<Separator />
							</Flex>
							<Flex
								className="relative text-xs uppercase"
								justify="center"
							>
								<span className="bg-card px-2 text-muted-foreground">
									Or continue with
								</span>
							</Flex>
						</Flex>
						<Flex
							direction="col"
							gap="3"
						>
							<SocialSignOnForm />

							<Button
								className="w-full"
								type="button"
								variant="outline"
							>
								<FaKey className="h-4 w-4" />
								Sign in with a passkey
							</Button>
						</Flex>
					</Card.Content>

					<Card.Footer>
						<Flex
							className="w-full"
							direction="col"
							gap="2"
							justify="center"
						>
							<p className="text-center text-muted-foreground text-sm">
								Don't have an account?{' '}
								<Link
									className="text-primary underline-offset-4 hover:underline"
									to="/sign-up"
								>
									Sign up
								</Link>
							</p>
							<p className="text-center text-muted-foreground text-sm">
								<Link
									className="text-primary underline-offset-4 hover:underline"
									to="/forgot-password"
								>
									Forgot password
								</Link>
							</p>
						</Flex>
					</Card.Footer>
				</Card>
			</Flex>
		</Flex>
	)
}
