import { forwardRef, ChangeEvent, Ref } from 'react'
import { TextInput } from '@mantine/core'
import { cnBase } from 'tailwind-variants'
import { debounce as debounceFn } from '@starter/shared'

import { useInputForm } from '../Form.hooks'
import { InputStyles } from './Input.styles'
import { InputProps } from './Input.types'

export const BaseInput = (
  { className, name, label, size = 'md', hint, debounce, onChange, onBlur, ...props }: InputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const inputProps = useInputForm(name)
  const styles = InputStyles()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleDebounceChange = debounceFn(handleChange, 200)

  const handleBlur = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  return debounce ? (
    <TextInput
      {...props}
      defaultValue={inputProps.value}
      error={inputProps.error}
      ref={ref}
      classNames={{ root: styles.root(), wrapper: styles.wrapper(), input: cnBase(className), label: styles.label(), error: styles.error() }}
      autoComplete="nope"
      label={label}
      size={size}
      description={hint}
      onChange={handleDebounceChange}
      onBlur={handleBlur}
    />
  ) : (
    <TextInput
      {...props}
      {...inputProps}
      value={inputProps.value ?? ''}
      ref={ref}
      classNames={{ root: styles.root(), wrapper: styles.wrapper(), input: cnBase(className), label: styles.label(), error: styles.error() }}
      autoComplete="nope"
      label={label}
      size={size}
      description={hint}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export const Input = forwardRef(BaseInput)
