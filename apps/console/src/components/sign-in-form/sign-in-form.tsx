import { Button, Flex, Form, Input } from '@starter/ui'

import type { SignInFormProps } from '@/components/sign-in-form/sign-in-form.types'

export const SignInForm = ({}: SignInFormProps) => {
	return (
		<Form>
			<Flex
				direction="col"
				gap="4"
			>
				<Form.Item label="Email">
					<Input
						placeholder="Email"
						type="email"
					/>
				</Form.Item>
				<Form.Item label="Password">
					<Input
						placeholder="Password"
						type="password"
					/>
				</Form.Item>
				<Button
					className="w-full"
					type="submit"
				>
					Sign In
				</Button>
			</Flex>
		</Form>
	)
}
