import twilio from 'twilio'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { IWhatsapp } from '../../ports/whatsapp'
import * as templates from '../../ports/whatsapp/templates'

export const Whatsapp = ({ env }: CreateDependenciesOptions): IWhatsapp => ({
  async send({ to, template, props }) {
    const client = twilio(env.TWILIO_WHATSAPP_ACCOUNT_SID, env.TWILIO_WHATSAPP_AUTH_TOKEN)

    const templateValue = templates[template]
    const contentSid = templateValue.contentSid
    const contentVariables = templateValue.contentVariables(props)

    try {
      // await client.messages.create({
      //   to: `whatsapp:${to}`,
      //   contentSid: templateValue.contentSid,
      //   contentVariables: templateValue.contentVariables(props),
      //   from: `whatsapp:+${env.TWILIO_WHATSAPP_FROM}`,
      // })
      console.log({ TWILIO_WHATSAPP_FROM: env.TWILIO_SMS_FROM, client, to, contentSid, contentVariables })
    } catch (error) {
      console.log({
        TWILIO_WHATSAPP_WHATSAPP_ERROR: JSON.stringify(error, null, 2),
      })

      throw error
    }
  },
})
