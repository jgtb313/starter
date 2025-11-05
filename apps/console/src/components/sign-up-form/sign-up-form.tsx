import { useI18n } from '@starter/react-i18n'
import { Button, Flex, Input, Label } from '@starter/ui'

import type { SignUpFormProps } from '@/components/sign-up-form/sign-up-form.types'

export const SignUpForm = ({}: SignUpFormProps) => {
	const i18n = useI18n()

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
					<Label>{i18n.t.name()}</Label>
					<Input
						placeholder={i18n.t.name()}
						type="text"
					/>
				</Flex>

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

				<Flex
					direction="col"
					gap="2"
				>
					<Flex
						align="center"
						justify="between"
					>
						<Label>{i18n.t.password()}</Label>
					</Flex>
					<Input
						placeholder="Password"
						type="password"
					/>
				</Flex>

				<Button
					className="w-full"
					type="submit"
				>
					{i18n.t.signUp()}
				</Button>
			</Flex>
		</form>
	)
}
