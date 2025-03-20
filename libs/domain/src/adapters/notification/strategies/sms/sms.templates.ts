import { NotificationTemplateProps } from '@/ports/notification'

export const templates: {
  [K in keyof NotificationTemplateProps['SMS']]: (input: NotificationTemplateProps['SMS'][K]) => string
} = {
  SEND_OTP: ({ code }) => `Your verification code is ${code}.`,
}
