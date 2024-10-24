import { cloneElement, forwardRef, useState, useEffect, ReactElement, ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
import { isNumber, isString } from '@starter/shared'

const MAXIMUM_FRACTION_DIGITS = 2
const SYMBOL_LENGTH = 3

const formatCurrency = (locale = 'pt-BR', value: number, currencyType = 'BRL', hideSymbol = false) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyType,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formattedValue = formatter.format(value)

  return formattedValue.slice(hideSymbol ? SYMBOL_LENGTH : 0)
}

const clearNumber = (value: string | number) => {
  if (isNumber(value)) {
    return value
  }

  return Number(value.toString().replace(/[^0-9-]/g, ''))
}

const normalizeValue = (number: string | number) => {
  let safeNumber = number

  if (isString(number)) {
    safeNumber = clearNumber(number)

    if (safeNumber % 1 !== 0) {
      safeNumber = safeNumber.toFixed(MAXIMUM_FRACTION_DIGITS)
    }
  } else {
    safeNumber = Number.isInteger(number) ? Number(number) * 10 ** MAXIMUM_FRACTION_DIGITS : number.toFixed(MAXIMUM_FRACTION_DIGITS)
  }

  return clearNumber(safeNumber) / 10 ** MAXIMUM_FRACTION_DIGITS
}

const maskValues = (locale: string, inputFieldValue: string | number | undefined, currency: string, shouldCutSymbol: boolean): [number, string] => {
  if (!inputFieldValue) return [0, '']

  const value = normalizeValue(inputFieldValue)
  const maskedValue = formatCurrency(locale, value, currency, shouldCutSymbol)

  return [value, maskedValue]
}

export type ICurrencyMaskProps = {
  InputElement?: ReactElement
  defaultValue?: number | string
  value?: number | string
  max?: number
  currency?: string
  locale?: string
  hideSymbol?: boolean
  autoSelect?: boolean
  autoReset?: boolean
  onChangeValue: (event: ChangeEvent<HTMLInputElement>, originalValue: number | string, maskedValue: number | string) => void
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>, originalValue: number | string, maskedValue: number | string) => void
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>, originalValue: number | string, maskedValue: number | string) => void
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>, originalValue: number | string, maskedValue: string) => void
}

export const CurrencyInput = forwardRef<HTMLInputElement, ICurrencyMaskProps>(
  (
    {
      InputElement,
      value,
      defaultValue,
      hideSymbol = false,
      currency = 'BRL',
      locale = 'pt-BR',
      max,
      autoSelect,
      autoReset,
      onChangeValue,
      onBlur,
      onFocus,
      onKeyPress,
      ...props
    },
    ref,
  ) => {
    const [maskedValue, setMaskedValue] = useState<number | string>('0')

    const updateValues = (originalValue: string | number) => {
      const [calculatedValue, calculatedMaskedValue] = maskValues(locale, originalValue, currency, hideSymbol)

      if (!max || calculatedValue <= max) {
        setMaskedValue(calculatedMaskedValue)

        return [calculatedValue, calculatedMaskedValue]
      }

      return [normalizeValue(maskedValue), maskedValue]
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()

      const [originalValue, maskedValue] = updateValues(event.target.value)

      onChangeValue(event, originalValue, maskedValue)
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
      const [originalValue, maskedValue] = updateValues(event.target.value)

      if (autoReset) {
        maskValues(locale, 0, currency, hideSymbol)
      }

      onBlur?.(event, originalValue, maskedValue)
    }

    const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
      if (autoSelect) {
        event.target.select()
      }

      const [originalValue, maskedValue] = updateValues(event.target.value)

      onFocus?.(event, originalValue, maskedValue)
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => onKeyPress && onKeyPress(event, event.key, event.key)

    useEffect(() => {
      const currentValue = value || defaultValue || undefined
      const [, maskedValue] = maskValues(locale, currentValue, currency, hideSymbol)

      setMaskedValue(maskedValue)
    }, [currency, defaultValue, hideSymbol, value])

    return cloneElement(InputElement as any, {
      ...props,
      ref,
      value: maskedValue,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyUp: handleKeyUp,
    })
  },
)
