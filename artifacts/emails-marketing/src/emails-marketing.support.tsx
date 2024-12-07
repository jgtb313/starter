import { render } from '@react-email/components'

import * as Emails from '@/emails'
import { EmailsEnum, EmailsMarketing } from '@/emails-marketing.types'

export type RenderEmailOptions<T extends EmailsEnum> = {
  email: T
  props: EmailsMarketing[T]
}

export const renderEmail = async <T extends EmailsEnum>({ email, props }: RenderEmailOptions<T>) => {
  const Email = Emails[email as unknown as keyof typeof Emails]

  const html = await render(<Email {...props} />)

  return {
    html,
    subject: Email.subject,
  }
}
