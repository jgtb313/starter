import { useEffect } from 'react'
import { nprogress } from '@mantine/nprogress'

export type UseNavigationProgressOptions = {
  state: 'idle' | 'submitting' | 'loading'
}

export const useNavigationProgress = ({ state }: UseNavigationProgressOptions) => {
  useEffect(() => {
    if (state === 'submitting' || state === 'loading') {
      nprogress.start()
    } else {
      nprogress.complete()
    }
  }, [state])
}
