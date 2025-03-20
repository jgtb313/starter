import { IEmails } from '@starter/emails'

export type NotificationChannel = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'WEB_PUSH' | 'MOBILE_PUSH'

export type NotificationTemplateProps = {
  EMAIL: IEmails

  SMS: {
    SEND_OTP: {
      code: string
    }
  }

  WHATSAPP: {
    SEND_OTP: {
      code: string
    }
  }

  WEB_PUSH: {
    WELCOME: {
      userName: string
    }
  }

  MOBILE_PUSH: {
    HELLO: {
      userName: string
    }
  }
}

export type NotificationTemplatePropsType<T extends NotificationChannel> = keyof NotificationTemplateProps[T]

export type IEmailAdapter = {
  send: (input: { to: string; subject: string; body: string }) => void
}

export type IMobilePushAdapter = {
  send: <T extends keyof NotificationTemplateProps['MOBILE_PUSH']>(input: {
    to: string
    body: string
    props: NotificationTemplateProps['MOBILE_PUSH'][T]
  }) => void
}

export type IWebPushAdapter = {
  send: <T extends keyof NotificationTemplateProps['WEB_PUSH']>(input: {
    to: string
    body: string
    props: NotificationTemplateProps['WEB_PUSH'][T]
  }) => void
}

export type ISMSAdapter = {
  send: (input: { to: string; body: string }) => void
}

export type IWhatsappAdapter = {
  send: (input: { to: string; contentSid: string; contentVariables: string }) => void
}

export type NotificationInput<T extends NotificationChannel, K extends keyof NotificationTemplateProps[T]> = {
  template: K
  recipient: string
  props: NotificationTemplateProps[T][K]
}

export type INotificationStrategy<T extends NotificationChannel> = {
  send: <K extends keyof NotificationTemplateProps[T]>(input: NotificationInput<T, K>) => void
}

export type INotification = {
  send: <T extends NotificationChannel, K extends keyof NotificationTemplateProps[T]>(channel: T, input: NotificationInput<T, K>) => void
}
