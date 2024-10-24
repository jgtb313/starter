import { PropsWithChildren } from 'react'
import { Select as MSelect, MultiSelect, SelectProps as ComponentProps, MultiSelectProps, ComboboxItem } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { SelectStyles } from './Select.styles'
import { SelectProps } from './Select.types'

const getOption = <T,>({
  options,
  option,
  optionValue = 'value' as keyof T
}: Pick<SelectProps<T>, 'options' | 'optionValue'> & { option: ComboboxItem }): T => options?.find((op) => op[optionValue] === option.value) as T

export const Select = <T,>({
  name,
  options,
  optionValue = 'value' as keyof T,
  optionLabel = 'label' as keyof T,
  size = 'md',
  hint,
  multiple = false,
  renderOption,
  onChange,
  onSearchChange,
  ...props
}: PropsWithChildren<SelectProps<T>>) => {
  const inputProps = useInputForm(name)
  const styles = SelectStyles(props)
  const data = options?.map((option) => ({ value: option[optionValue] as string, label: option[optionLabel] as string }))

  const handleChange: ComponentProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value ?? undefined)
  }

  const handleMultipleChange: MultiSelectProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur = () => {
    inputProps.onBlur()
  }

  if (multiple) {
    return (
      <MultiSelect
        {...props}
        {...inputProps}
        classNames={{ root: styles.root(), error: styles.error() }}
        data={data}
        size={size}
        onChange={handleMultipleChange}
        onBlur={handleBlur}
        searchable
      />
    )
  }

  return (
    <MSelect
      {...props}
      {...inputProps}
      classNames={{ root: styles.root() }}
      data={data}
      size={size}
      description={hint}
      renderOption={(item) => renderOption?.(getOption({ options, option: item.option, optionValue }))}
      onChange={handleChange}
      onSearchChange={onSearchChange}
      onBlur={handleBlur}
      searchable
    />
  )
}
