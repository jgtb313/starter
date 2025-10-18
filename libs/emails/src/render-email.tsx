import { render } from '@react-email/components'

import { emails } from '@/emails'
import type { IEmails } from '@/interfaces'

import { defaultLocale } from './emails.i18n'

export type RenderEmailOptions<T extends keyof IEmails> = {
	template: T
	props: IEmails[T]
}

export const renderEmail = async <T extends keyof IEmails>({
	template,
	props,
}: RenderEmailOptions<T>) => {
	const locale = props.locale ?? defaultLocale
	const Email = emails[template]

	const html = await render(
		<Email
			{...JSON.parse(JSON.stringify(props))}
			locale={locale}
		/>,
	)

	return {
		html,
		subject: Email.subject(locale),
	}
}
