import { Flex, Input, Label } from '@starter/ui'

import type { SignInPasswordLessFormProps } from '@/components/sign-in-password-less-form/sign-in-password-less-form.types'

export const SignInPasswordLessForm = ({}: SignInPasswordLessFormProps) => {
	return (
		<form>
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
		</form>
	)
}
