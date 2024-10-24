import { useRef } from 'react'

import { UploadRef } from './Upload.types'

export const useUpload = () => useRef<UploadRef>(null)
