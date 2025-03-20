import { TextInput as Component } from '@mantine/core'
import { useFormContext, FieldValues } from 'react-hook-form'
import { get } from '@starter/common'

import { TextInputProps } from './input.types'

export const TextInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  const { formState, register } = useFormContext<T>()
  const inputProps = register(props.name)
  const error = get(formState.errors, [props.name, 'message']) as unknown as string

  return <Component {...props} {...inputProps} error={error} />
}
