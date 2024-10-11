import twilio from 'twilio'

import { env } from '@/config'
import { IWhatsapp } from '@/ports/whatsapp'
import * as templates from '@/ports/whatsapp/templates'

const TWILIO_WHATSAPP_ACCOUNT_SID = env('TWILIO_WHATSAPP_ACCOUNT_SID')
const TWILIO_WHATSAPP_AUTH_TOKEN = env('TWILIO_WHATSAPP_AUTH_TOKEN')
const TWILIO_WHATSAPP_FROM = env('TWILIO_WHATSAPP_FROM')

const client = twilio(TWILIO_WHATSAPP_ACCOUNT_SID, TWILIO_WHATSAPP_AUTH_TOKEN)

export const Whatsapp: IWhatsapp = {
  async send({ to, template, props }) {
    const templateValue = templates[template]
    const contentSid = templateValue.contentSid
    const contentVariables = templateValue.contentVariables(props)

    try {
      // await client.messages.create({
      //   to: `whatsapp:${to}`,
      //   contentSid: templateValue.contentSid,
      //   contentVariables: templateValue.contentVariables(props),
      //   from: `whatsapp:+${TWILIO_WHATSAPP_FROM}`,
      // })
      console.log({ TWILIO_WHATSAPP_FROM, client, to, contentSid, contentVariables })
    } catch (error) {
      console.log({
        TWILIO_WHATSAPP_WHATSAPP_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
}
