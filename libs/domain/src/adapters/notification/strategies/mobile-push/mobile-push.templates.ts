import { NotificationTemplateProps } from '@/ports/notification'

export const templates: {
  [K in keyof NotificationTemplateProps['MOBILE_PUSH']]: (input: NotificationTemplateProps['MOBILE_PUSH'][K]) => string
} = {
  HELLO: ({ userName }) => `Hello, ${userName}`,
}
