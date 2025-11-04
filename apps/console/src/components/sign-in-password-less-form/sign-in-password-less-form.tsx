import { useI18n } from '@starter/react-i18n'
import { Flex, Input, Label } from '@starter/ui'

import type { SignInPasswordLessFormProps } from '@/components/sign-in-password-less-form/sign-in-password-less-form.types'

export const SignInPasswordLessForm = ({}: SignInPasswordLessFormProps) => {
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
					required
					type="email"
				/>
			</Flex>
		</form>
	)
}
