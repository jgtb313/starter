export type BaseComponent<T, K = {}> = T &
  K & {
    style?: React.CSSProperties
    className?: string
  }
