import { EnvSchema } from '@/config'
import { Bootstrap } from '@/bootstrap'
import { Dependencies } from '@/dependencies'
import { Server } from '@/adapters/fastify'

;(async () => {
  EnvSchema.parse(process.env)

  await Bootstrap()
  await Server.start(Dependencies)
})()
