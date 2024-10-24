import { ChangeEventHandler } from 'react'
import { Checkbox as MCheckbox } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { CheckboxStyles } from './Checkbox.styles'
import { CheckboxProps } from './Checkbox.types'

export const Checkbox = ({ name, size = 'md', hint, onChange, ...props }: CheckboxProps) => {
  const inputProps = useInputForm(name)
  const styles = CheckboxStyles(props)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.checked

    inputProps.onChange(value)
    onChange?.(value)
  }

  return (
    <MCheckbox
      {...props}
      {...inputProps}
      checked={inputProps.value}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      onChange={handleChange}
    />
  )
}
