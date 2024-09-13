import { Bootstrap } from '@/bootstrap'
import { Dependencies } from '@/dependencies'
import { Server } from '@/adapters/fastify'

const bootstrap = async () => {
  await Bootstrap()
  await Server.start(Dependencies)
}

bootstrap()
