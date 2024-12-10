import { bootstrap } from '@starter/domain'

import { Dependencies } from '@/dependencies'
import { Server } from '@/adapters/fastify'

//
;(async () => {
  await bootstrap(Dependencies)
  await Server.start(Dependencies)
})()
