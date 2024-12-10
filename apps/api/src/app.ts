import { Bootstrap } from '@/bootstrap'
import { Dependencies } from '@/dependencies'
import { Server } from '@/adapters/fastify'

//
;(async () => {
  await Bootstrap()
  await Server.start(Dependencies)
})()
