import { useI18n } from '@starter/react-i18n'
import { Button, Flex } from '@starter/ui'

import { FaFacebook, FaGoogle } from 'react-icons/fa'

import type { SocialSignOnFormProps } from '@/components/social-sign-on-form/social-sign-on-form.types'

export const SocialSignOnForm = ({}: SocialSignOnFormProps) => {
	const i18n = useI18n()

	return (
		<Flex
			className="w-full"
			direction="col"
			gap="3"
		>
			<Button
				className="w-full"
				type="button"
				variant="outline"
			>
				<FaGoogle className="h-4 w-4" />
				{i18n.t.continueWithGoogle()}
			</Button>
			<Button
				className="w-full"
				type="button"
				variant="outline"
			>
				<FaFacebook className="h-4 w-4" />
				{i18n.t.continueWithFacebook()}
			</Button>
		</Flex>
	)
}
