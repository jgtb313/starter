import { DatePickerInput, DateInputProps as ComponentProps, PickerBaseProps } from '@mantine/dates'
import dayjs from 'dayjs'

import { useFormInput } from '../Form.hooks'
import { DateInputStyles } from './DateInput.styles'
import { DateInputProps } from './DateInput.types'

const resolveRangeValue = (value?: string): [Date, Date | null] | undefined => {
  if (!value) {
    return undefined
  }

  const [startAt, endAt] = value.split(',')

  if (!endAt) {
    return [dayjs(new Date(startAt)).toDate(), null]
  }

  return [dayjs(new Date(startAt)).toDate(), dayjs(new Date(endAt)).toDate()]
}

export const DateInput = ({ name, type = 'default', size = 'md', hint, onChange, ...props }: DateInputProps) => {
  const form = useFormInput()
  const inputProps = form.getInputProps(name)
  const styles = DateInputStyles(props)

  const handleChange: ComponentProps['onChange'] = (value) => {
    if (!value) {
      inputProps.onChange(undefined)
      onChange?.(undefined)

      return
    }

    const formattedValue = dayjs(value).format('YYYY-MM-DD HH:mm:ssZ')

    inputProps.onChange(formattedValue)
    onChange?.(formattedValue)
  }

  const handleRangeChange: PickerBaseProps<'range'>['onChange'] = ([startAt, endAt]) => {
    if (!endAt) {
      const formattedValue = dayjs(startAt).format('YYYY-MM-DD HH:mm:ssZ')

      inputProps.onChange(formattedValue)
      onChange?.(formattedValue)

      return
    }

    const formattedValue = `${dayjs(startAt).format('YYYY-MM-DD HH:mm:ssZ')},${dayjs(endAt).format('YYYY-MM-DD HH:mm:ssZ')}`

    inputProps.onChange(formattedValue)
    onChange?.(formattedValue)
  }

  const customProps = {
    ...props,
    ...inputProps,
    classNames: {
      root: styles.root(),
      error: styles.error()
    },
    size,
    description: hint
  }

  if (type === 'range') {
    return (
      <DatePickerInput
        {...customProps}
        type="range"
        value={resolveRangeValue(inputProps.value)}
        valueFormat="DD/MM/YYYY"
        labelSeparator="até"
        onChange={handleRangeChange}
      />
    )
  }

  return (
    <DatePickerInput
      {...customProps}
      valueFormat="DD/MM/YYYY"
      value={inputProps.value ? dayjs(inputProps.value).toDate() : undefined}
      onChange={handleChange}
    />
  )
}
