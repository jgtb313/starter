import { createTransport } from 'nodemailer'
import { renderEmail } from '@starter/emails-marketing'

import { env } from '@/config'
import { IMail } from '@/ports/mail'

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
  async send({ template, props, to }) {
    try {
      const { html, subject } = await renderEmail({ email: template, props })

      const mailOptions = {
        from: GOOGLE_MAIL_USER,
        to: to === 'SELF' ? GOOGLE_MAIL_USER : to,
        subject,
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
