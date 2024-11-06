import { useSearchParams as remixUseSearchParams } from '@remix-run/react'

export const useSearchParams = () => {
  const [searchParams] = remixUseSearchParams()

  return searchParams
}
