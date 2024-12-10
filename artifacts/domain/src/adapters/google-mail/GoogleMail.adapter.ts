import { createTransport } from 'nodemailer'
import { renderEmail } from '@starter/emails-marketing'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { IMail } from '../../ports/mail'

export const Mail = ({ env }: CreateDependenciesOptions): IMail => ({
  async send({ template, props, to }) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: env.GOOGLE_MAIL_USER,
        pass: env.GOOGLE_MAIL_PASSWORD,
      },
    })

    try {
      const { html, subject } = await renderEmail({ email: template, props })

      const mailOptions = {
        from: env.GOOGLE_MAIL_USER,
        to: to === 'SELF' ? env.GOOGLE_MAIL_USER : to,
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
})
