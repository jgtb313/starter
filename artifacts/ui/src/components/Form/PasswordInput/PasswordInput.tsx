import { ChangeEvent } from 'react'
import { PasswordInput as MPasswordInput } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { Icon } from '../../Icon'
import { PasswordInputStyles } from './PasswordInput.styles'
import { PasswordInputProps } from './PasswordInput.types'

export const PasswordInput = ({ name, label, size = 'md', hint, onChange, onBlur, ...props }: PasswordInputProps) => {
  const inputProps = useInputForm(name)
  const styles = PasswordInputStyles()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || undefined

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  return (
    <MPasswordInput
      {...props}
      {...inputProps}
      value={inputProps.value ?? ''}
      classNames={{ root: styles.root(), label: styles.label(), error: styles.error() }}
      autoComplete="nope"
      label={label}
      size={size}
      description={hint}
      visibilityToggleIcon={({ reveal }) => <Icon name={reveal ? 'EyeOff' : 'Eye'} strokeWidth={1.5} />}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
