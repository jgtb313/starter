import { useParams as remixUseParams } from '@remix-run/react'

export const useParams = <T>(): T => {
  const params = remixUseParams()

  return params as T
}
