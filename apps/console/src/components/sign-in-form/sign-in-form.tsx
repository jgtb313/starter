import { Button, Flex, Input, Label } from '@starter/ui'

import type { SignInFormProps } from '@/components/sign-in-form/sign-in-form.types'

export const SignInForm = ({}: SignInFormProps) => {
	return (
		<form>
			<Flex
				direction="col"
				gap="4"
			>
				<Flex
					direction="col"
					gap="2"
				>
					<Label>Email</Label>
					<Input
						placeholder="Email"
						required
						type="email"
					/>
				</Flex>
				<Flex
					direction="col"
					gap="2"
				>
					<Flex
						align="center"
						justify="between"
					>
						<Label>Password</Label>
					</Flex>
					<Input
						placeholder="Password"
						required
						type="password"
					/>
				</Flex>
				<Button
					className="w-full"
					type="submit"
				>
					Sign In
				</Button>
			</Flex>
		</form>
	)
}
