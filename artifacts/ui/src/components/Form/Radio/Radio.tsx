import { PropsWithChildren } from 'react'
import { Radio as MRadio, RadioProps as MRadioProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { RadioStyles } from './Radio.styles'
import { RadioProps } from './Radio.types'

export const Radio = ({ name, size = 'md', hint, clearable = false, onChange, children, ...props }: PropsWithChildren<RadioProps>) => {
  const inputProps = useInputForm(name)
  const styles = RadioStyles(props)

  const handleChange: MRadioProps['onChange'] = (event) => {
    const value = event.target.checked

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleClick: MRadioProps['onClick'] = () => {
    if (!clearable) {
      return
    }

    onChange?.(!inputProps.checked)
  }

  return (
    <MRadio
      {...props}
      {...inputProps}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      onChange={handleChange}
      onClick={handleClick}
    >
      {children}
    </MRadio>
  )
}
