import { TextInputProps as ComponentProps } from '@mantine/core'
import { FieldValues, Path } from 'react-hook-form'

export type TextInputProps<T extends FieldValues> = Omit<ComponentProps, 'name'> & {
  name: Path<T>
}
