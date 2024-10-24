import { Flex, Checkbox, CheckboxGroupProps as MCheckboxGroupProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { CheckboxGroupStyles } from './CheckboxGroup.styles'
import { CheckboxGroupProps } from './CheckboxGroup.types'

export const CheckboxGroup = ({ name, type = 'row', size = 'md', hint, labelPosition, items = [], onChange, ...props }: CheckboxGroupProps) => {
  const inputProps = useInputForm(name)
  const styles = CheckboxGroupStyles(props)

  const handleChange: MCheckboxGroupProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value)
  }

  return (
    <Checkbox.Group
      {...props}
      {...inputProps}
      classNames={{ root: styles.root(), error: styles.error() }}
      size={size}
      description={hint}
      onChange={handleChange}
    >
      <Flex direction={type} gap={12} mt={8}>
        {items.map((item, index) => (
          <Checkbox key={index} {...item} labelPosition={labelPosition} size={size} data-testid={item.value} />
        ))}
      </Flex>
    </Checkbox.Group>
  )
}
