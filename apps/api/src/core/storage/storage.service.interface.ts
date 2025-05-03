import { FileContextEnum } from '@/core/storage/storage.controller.schema'

export interface IStorageService {
  getPresignedUrl(
    fileContext: FileContextEnum,
    fileName: string,
  ): Promise<{
    fileName: string
    fileNameSigned: string
  }>
}
