import type { NotificationTemplateProps } from '@/ports/notification'

export const templates: {
	[K in keyof NotificationTemplateProps['WHATSAPP']]: (
		input: NotificationTemplateProps['WHATSAPP'][K],
	) => {
		contentSid: string
		contentVariables: string
	}
} = {
	SEND_OTP: (props) => ({
		contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
		contentVariables: `{ "1": "${props.code}" }`,
	}),
}
