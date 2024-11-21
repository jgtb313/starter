import { createTransport } from 'nodemailer'
import ejs from 'ejs'

import { env } from '@/config'
import { IMail } from '@/ports/mail'
import { getSubject } from '@/ports/mail'

const templatesPath = `${process.cwd()}/src/ports/mail/templates`

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
  async send({ to, template, props }) {
    try {
      const html = await ejs.renderFile(`${templatesPath}/${template.toLowerCase()}.mail.ejs`, props)

      const subject = getSubject(html)

      const mailOptions = {
        from: GOOGLE_MAIL_USER,
        to: to === 'SELF' ? GOOGLE_MAIL_USER : to,
        subject,
        html,
      }

      const res = await transporter.sendMail(mailOptions)

      console.log({ res })
    } catch (error) {
      console.log({
        GOOGLEMAIL_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
}
