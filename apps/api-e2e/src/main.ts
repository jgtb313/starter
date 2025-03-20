import { startVitest } from 'vitest/node'

export const handler = async () => {
  await startVitest('test')
}
