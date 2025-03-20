import { FieldValues, UseFormReturn } from 'react-hook-form'

export type FormProps<T extends FieldValues> = UseFormReturn<T> & {
  id?: string
  onSubmit?: (input: T) => void
  onError?: (errors: Record<string, string>[]) => void
}
