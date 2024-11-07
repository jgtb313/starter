import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type FileState = {
  requestFilename: RequestOptions<typeof client.file.requestFilename>

  loadingRequestFilename: boolean
}
