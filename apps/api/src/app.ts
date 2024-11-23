import { EnvSchema } from '@/config'
// import { Bootstrap } from '@/bootstrap'
import { Dependencies } from '@/dependencies'
// import { Server } from '@/adapters/fastify'

//
import { MailTemplateEnum } from './ports/mail'
;(async () => {
  EnvSchema.parse(process.env)

  // await Bootstrap()
  // await Server.start(Dependencies)

  Dependencies.Mail.send({ to: 'jgtb313@gmail.com', template: MailTemplateEnum.SEND_OTP, props: { code: '5000' } })
})()
