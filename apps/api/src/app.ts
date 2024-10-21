import { EnvSchema } from '@/config'
import { Bootstrap } from '@/bootstrap'
import { Dependencies } from '@/dependencies'
import { Server } from '@/adapters/fastify'

const bootstrap = async () => {
  EnvSchema.parse(process.env)

  await Bootstrap()
  await Server.start(Dependencies)
}

bootstrap()
