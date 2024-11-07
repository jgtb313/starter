import { useEffect, useRef, EffectCallback, DependencyList } from 'react'

export const useWatch = (callback: EffectCallback, deps: DependencyList) => {
  const rendered = useRef(false)

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true
      return
    }

    callback()
  }, deps)
}
