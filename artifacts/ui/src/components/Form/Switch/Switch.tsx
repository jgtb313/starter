import { Switch as Component, SwitchProps as ComponentProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { SwitchStyles } from './Switch.styles'
import { SwitchProps } from './Switch.types'

export const Switch = ({ name, size = 'md', hint, onChange, ...props }: SwitchProps) => {
  const inputProps = useInputForm(name)
  const styles = SwitchStyles(props)

  const handleChange: ComponentProps['onChange'] = (event) => {
    const value = event.currentTarget.checked

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur = () => {
    inputProps.onBlur()
  }

  return (
    <Component
      {...props}
      {...inputProps}
      checked={inputProps.value}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
