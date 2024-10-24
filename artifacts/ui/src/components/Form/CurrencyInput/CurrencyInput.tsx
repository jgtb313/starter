import { forwardRef, Ref } from 'react'
import { InputBase } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { CurrencyInput as ReactCurrencyInput, ICurrencyMaskProps } from './CurrencyInput.support'
import { CurrencyInputStyles } from './CurrencyInput.styles'
import { CurrencyInputProps } from './CurrencyInput.types'

type BaseCurrencyInputProps = CurrencyInputProps

const BaseCurrencyInput = ({ name, size = 'md', hint, onChange, onBlur, ...props }: BaseCurrencyInputProps, refMask: Ref<HTMLInputElement>) => {
  const inputProps = useInputForm(name)
  const styles = CurrencyInputStyles()

  const handleChange: ICurrencyMaskProps['onChangeValue'] = (_, originalValue) => {
    const formattedValue = Number(originalValue) * 100

    inputProps.onChange(formattedValue)
    onChange?.(formattedValue)
  }

  const handleBlur = () => {
    inputProps.onBlur()
    onBlur?.()
  }

  return (
    <ReactCurrencyInput
      ref={refMask}
      defaultValue={inputProps.value ? inputProps.value / 100 : undefined}
      onChangeValue={handleChange}
      onBlur={handleBlur}
      InputElement={
        <InputBase {...props} classNames={{ root: styles.root(), error: styles.error() }} autoComplete="nope" size={size} description={hint} />
      }
    />
  )
}

export const CurrencyInput = forwardRef(BaseCurrencyInput)
