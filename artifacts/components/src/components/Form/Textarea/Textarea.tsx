import { PropsWithChildren } from 'react'
import { Textarea as MTextarea, TextareaProps as MTextareaProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { TextareaStyles } from './Textarea.styles'
import { TextareaProps } from './Textarea.types'

export const Textarea = ({ name, size = 'md', hint, autoSize = false, onChange, onBlur, children, ...props }: PropsWithChildren<TextareaProps>) => {
  const inputProps = useInputForm(name)
  const styles = TextareaStyles(props)

  const handleChange: MTextareaProps['onChange'] = (event) => {
    const value = event.target.value

    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur: MTextareaProps['onChange'] = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  return (
    <MTextarea
      {...props}
      {...inputProps}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      autosize={autoSize}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {children}
    </MTextarea>
  )
}
