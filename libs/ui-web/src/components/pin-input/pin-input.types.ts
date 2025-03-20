import { PinInputProps as ComponentProps } from '@mantine/core'
import { FieldValues, Path } from 'react-hook-form'

export type PinInputProps<T extends FieldValues> = Omit<ComponentProps, 'name'> & {
  name: Path<T>
}
