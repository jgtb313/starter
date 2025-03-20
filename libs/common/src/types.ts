export type Required<T> = T extends undefined ? never : T extends null ? never : T

export type Paths<T> =
  T extends Array<infer U>
    ? `${Paths<U>}`
    : T extends object
      ? {
          [K in keyof T & (string | number)]: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never
        }[keyof T & (string | number)]
      : never

export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

export type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P]
}

export type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P]
}

export type Nullable<T> = T & null
