import { render } from '@react-email/components'

import { emails } from '@/emails'
import type { IEmails } from '@/interfaces'

export type RenderEmailOptions<T extends keyof IEmails> = {
	template: T
	props: IEmails[T]
}

export const renderEmail = async <T extends keyof IEmails>({
	template,
	props,
}: RenderEmailOptions<T>) => {
	const Email = emails[template]

	const html = await render(<Email {...JSON.parse(JSON.stringify(props))} />)

	return {
		html,
		subject: Email.subject,
	}
}
