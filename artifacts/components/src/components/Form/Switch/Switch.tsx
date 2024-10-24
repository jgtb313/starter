import { PropsWithChildren } from 'react'
import { Switch as MSwitch, SwitchProps as MSwitchProps } from '@mantine/core'

import { useFormInput } from '../Form.hooks'
import { SwitchStyles } from './Switch.styles'
import { SwitchProps } from './Switch.types'

export const Switch = ({ name, size = 'md', hint, onChange, children, ...props }: PropsWithChildren<SwitchProps>) => {
  const form = useFormInput()
  const inputProps = form.getInputProps(name)
  const styles = SwitchStyles(props)

  const handleChange: MSwitchProps['onChange'] = (event) => {
    const value = event.currentTarget.checked

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur = () => {
    inputProps.onBlur()
  }

  return (
    <MSwitch
      {...props}
      {...inputProps}
      checked={inputProps.value}
      key={form.key(name)}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {children}
    </MSwitch>
  )
}
