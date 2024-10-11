import twilio from 'twilio'
import { get } from '@starter/shared'

import { env } from '@/config'
import { ISMS } from '@/ports/sms'
import * as templates from '@/ports/sms/templates'

const TWILIO_SMS_ACCOUNT_SID = env('TWILIO_SMS_ACCOUNT_SID')
const TWILIO_SMS_AUTH_TOKEN = env('TWILIO_SMS_AUTH_TOKEN')
const TWILIO_SMS_FROM = env('TWILIO_SMS_FROM')

const client = twilio(TWILIO_SMS_ACCOUNT_SID, TWILIO_SMS_AUTH_TOKEN)

export const SMS: ISMS = {
  async send({ to, template, props }) {
    const templateValue = templates[template]
    const body = templateValue.replace(/{{\s*([^}]+)\s*}}/g, (_, prop) => get(props, prop.trim()))

    try {
      // await client.messages.create({
      //   to,
      //   body,
      //   from: TWILIO_SMS_FROM
      // })
      console.log({ TWILIO_SMS_FROM, client, to, body })
    } catch (error) {
      console.log({
        TWILIO_SMS_SMS_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
}
