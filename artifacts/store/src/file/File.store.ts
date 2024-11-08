import { create } from 'zustand'
import client from '@starter/client'
import { makeRequest } from '@starter/use-hooks'

import { useStore } from '@/Store.context'
import { FileState } from './File.store.types'

const store = create<FileState>()

export const useFile = store((set) => ({
  loadingRequestFilename: false,

  async requestFilename(params, options) {
    return makeRequest(client.file.requestFilename, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingRequestFilename: true,
        }),
      onFinally: () =>
        set({
          loadingRequestFilename: false,
        }),
      onError: useStore.getState().onError,
    })
  },
}))
