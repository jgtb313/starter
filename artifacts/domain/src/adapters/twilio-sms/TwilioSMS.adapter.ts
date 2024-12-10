import twilio from 'twilio'
import { get } from '@starter/shared'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { ISMS } from '../../ports/sms'
import * as templates from '../../ports/sms/templates'

export const SMS = ({ env }: CreateDependenciesOptions): ISMS => ({
  async send({ to, template, props }) {
    const client = twilio(env.TWILIO_SMS_ACCOUNT_SID, env.TWILIO_SMS_AUTH_TOKEN)

    const templateValue = templates[template]
    const body = templateValue.replace(/{{\s*([^}]+)\s*}}/g, (_, prop) => get(props, prop.trim()))

    try {
      // await client.messages.create({
      //   to,
      //   body,
      //   from: env.TWILIO_SMS_FROM
      // })
      console.log({ TWILIO_SMS_FROM: env.TWILIO_SMS_FROM, client, to, body })
    } catch (error) {
      console.log({
        TWILIO_SMS_SMS_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
})
