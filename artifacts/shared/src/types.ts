export type Required<T> = T extends undefined ? never : T extends null ? never : T

export type Paths<T> = T extends Array<infer U>
  ? `${Paths<U>}`
  : T extends object
  ? {
      [K in keyof T & (string | number)]: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never
    }[keyof T & (string | number)]
  : never

export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
