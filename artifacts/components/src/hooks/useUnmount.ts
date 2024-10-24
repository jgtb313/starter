import { useEffect, EffectCallback } from 'react'

export const useUnmount = (callback: EffectCallback) => {
  useEffect(() => {
    return () => {
      callback()
    }
  }, [])
}
