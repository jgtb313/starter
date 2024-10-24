import { forwardRef, Ref } from 'react'
import { InputBase } from '@mantine/core'
import { IMaskInput } from 'react-imask'
import { cnBase } from 'tailwind-variants'

import { useInputForm } from '../Form.hooks'
import { MaskInputStyles } from './MaskInput.styles'
import { MaskInputProps } from './MaskInput.types'

export const BaseMaskInput = (
  { classNames, className, name, label, size = 'md', hint, onChange, onBlur, onFocus, ...props }: MaskInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const inputProps = useInputForm(name)
  const styles = MaskInputStyles()

  const handleChange = (value?: string) => {
    value = value ? value.replace(/\D/g, '') : value

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    onFocus?.()
  }

  return (
    <InputBase
      {...props}
      {...inputProps}
      inputRef={ref}
      classNames={{
        root: cnBase(styles.root()),
        label: cnBase(styles.label()),
        input: cnBase(styles.input(), className),
        error: styles.error(),
        ...classNames
      }}
      leftSectionWidth={45}
      component={IMaskInput}
      autoComplete="nope"
      label={label}
      size={size}
      description={hint}
      onAccept={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
}

export const MaskInput = forwardRef(BaseMaskInput)
