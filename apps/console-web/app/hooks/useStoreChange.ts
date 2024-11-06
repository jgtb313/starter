import { useWatch } from '@ss/components'
import { useApp } from '~/stores'

export type UseStoreChangeOptions = {
  onChange: () => void
}

export const useStoreChange = ({ onChange }: UseStoreChangeOptions) => {
  const { store } = useApp()

  useWatch(() => {
    onChange()
  }, [store.id])
}
