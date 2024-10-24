import { FlexProps } from '@mantine/core'
import { Path, PathValue } from 'react-hook-form'
import { ZodSchema } from '@starter/schema'

import { BaseComponent } from '@/support/types'

type NullableDeep<T> = T extends (infer U)[] ? NullableDeep<U>[] | null : T extends object ? { [K in keyof T]: NullableDeep<T[K]> | null } : T | null

export type FormInput =
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'ColorInput'
  | 'CurrencyInput'
  | 'DateInput'
  | 'DocumentInput'
  | 'Input'
  | 'MaskInput'
  | 'PasswordInput'
  | 'PhoneInput'
  | 'PinInput'
  | 'Radio'
  | 'RadioGroup'
  | 'Select'
  | 'Switch'
  | 'Textarea'
  | 'Upload'

export type FormRef<T> = {
  values: () => T
  update: (key: Path<T>, input: PathValue<T, Path<T>>) => void
  append: (key: Path<T>, input: PathValue<T, Path<T>>) => void
  replace: (key: Path<T>, input: PathValue<T, Path<T>>, index: number) => void
  remove: (key: Path<T>, index: number) => void
  submit: () => void
  reset: () => void
}

export type FormRenderer<K> = { values: Partial<K> }

export type FormProps<T> = BaseComponent<{
  ref?: any
  id?: string
  flex?: FlexProps['flex']
  initialValues?: NullableDeep<T>
  schema?: ZodSchema
  onSubmit?: (input: T) => void
  onError?: (errors: Record<Path<T>, string>) => void
  children: <K>(input: FormRenderer<K>) => React.ReactNode
}>
