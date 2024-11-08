export type StoreState = {
  onError?: (error: string) => void

  apply: (props: Pick<StoreState, 'onError'>) => void
}
