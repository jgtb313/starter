import { createTransport } from 'nodemailer'
import { render } from '@react-email/components'

import { env } from '@/config'
import { IMail } from '@/ports/mail'

import { Layout } from '@/ports/mail/templates/Layout.mail'

const GOOGLE_MAIL_USER = env('GOOGLE_MAIL_USER')
const GOOGLE_MAIL_PASSWORD = env('GOOGLE_MAIL_PASSWORD')

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: GOOGLE_MAIL_USER,
    pass: GOOGLE_MAIL_PASSWORD,
  },
})

export const Mail: IMail = {
  async send({ to }) {
    try {
      const html = await render(<Layout title="Test" />)

      const mailOptions = {
        from: GOOGLE_MAIL_USER,
        to: to === 'SELF' ? GOOGLE_MAIL_USER : to,
        subject: 'Subject',
        html,
      }

      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.log({
        GOOGLEMAIL_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
}
