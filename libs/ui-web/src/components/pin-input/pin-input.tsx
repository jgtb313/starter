import { PinInput as Component } from '@mantine/core'
import { useFormContext, FieldValues, PathValue, Path } from 'react-hook-form'
import { get } from '@starter/common'

import { PinInputProps } from './pin-input.types'

export const PinInput = <T extends FieldValues>(props: PinInputProps<T>) => {
  const { formState, register, setValue } = useFormContext<T>()
  const inputProps = register(props.name)
  const error = !!get(formState.errors, [props.name, 'message'])

  return <Component {...props} {...inputProps} error={error} onChange={(value) => setValue(props.name, value as PathValue<T, Path<T>>)} />
}
