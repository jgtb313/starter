import { useI18n } from '@starter/react-i18n'
import { Flex, Input, Label } from '@starter/ui'

import type { ForgotPasswordFormProps } from '@/components/forgot-password-form/forgot-password-form.types'

export const ForgotPasswordForm = ({}: ForgotPasswordFormProps) => {
	const i18n = useI18n()

	return (
		<form>
			<Flex
				direction="col"
				gap="2"
			>
				<Label>{i18n.t.email()}</Label>
				<Input
					placeholder={i18n.t.email()}
					type="email"
				/>
			</Flex>
		</form>
	)
}
