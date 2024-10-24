import { Radio, Flex } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { RadioGroupStyles } from './RadioGroup.styles'
import { RadioGroupProps } from './RadioGroup.types'

export const RadioGroup = ({ name, type = 'row', items, size = 'md', onChange, ...props }: RadioGroupProps) => {
  const inputProps = useInputForm(name)
  const styles = RadioGroupStyles(props)

  const handleChange: RadioGroupProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value)
  }

  return (
    <Radio.Group
      classNames={{ root: styles.root(), label: styles.label(), error: styles.error() }}
      {...props}
      {...inputProps}
      name={name}
      size={size}
      onChange={handleChange}
    >
      <Flex direction={type} gap={12} mt={8}>
        {items?.map((item, index) => (
          <Radio key={index} classNames={{ body: styles.body() }} {...item} size={size} />
        ))}
      </Flex>
    </Radio.Group>
  )
}
