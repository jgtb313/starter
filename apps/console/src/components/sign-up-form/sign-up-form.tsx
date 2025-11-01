import { Button, Flex, Input, Label } from '@starter/ui'

import type { SignUpFormProps } from '@/components/sign-up-form/sign-up-form.types'

export const SignUpForm = ({}: SignUpFormProps) => {
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
					<Label>Name</Label>
					<Input
						placeholder="Name"
						required
						type="text"
					/>
				</Flex>

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
					Sign Up
				</Button>
			</Flex>
		</form>
	)
}
