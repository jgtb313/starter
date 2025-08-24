import type { NotificationTemplateProps } from '@/ports/notification'

export const templates: {
	[K in keyof NotificationTemplateProps['WEB_PUSH']]: (
		input: NotificationTemplateProps['WEB_PUSH'][K],
	) => string
} = {
	WELCOME: ({ userName }) => `Welcome, ${userName}`,
}
