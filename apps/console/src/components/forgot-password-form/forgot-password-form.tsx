import { Flex, Input, Label } from '@starter/ui'

import type { ForgotPasswordFormProps } from '@/components/forgot-password-form/forgot-password-form.types'

export const ForgotPasswordForm = ({}: ForgotPasswordFormProps) => {
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
