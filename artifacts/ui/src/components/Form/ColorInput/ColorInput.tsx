import { useId } from 'react'
import { Popover, ColorPicker, ColorSwatch, InputLabel, Flex, ColorPickerProps } from '@mantine/core'

import { useInputForm } from '../Form.hooks'
import { ColorInputStyles } from './ColorInput.styles'
import { ColorInputProps } from './ColorInput.types'

export const ColorInput = ({ name, label, size = 'md', onChange, ...props }: ColorInputProps) => {
  const id = useId()
  const inputProps = useInputForm(name)
  const styles = ColorInputStyles(props)

  const handleChange: ColorPickerProps['onChange'] = (value) => {
    inputProps.onChange(value)
    onChange?.(value)
  }

  return (
    <Popover position="bottom-start">
      <Popover.Target>
        <Flex direction="column">
          {label && (
            <InputLabel id={id} size={size}>
              {label}
            </InputLabel>
          )}

          <input className="hidden" aria-labelledby={id} />

          <ColorSwatch {...props} className="cursor-pointer" component="button" color={inputProps.value ?? 'rgba(255, 255, 255, 0.7)'} withShadow />
        </Flex>
      </Popover.Target>

      <Popover.Dropdown>
        <ColorPicker
          {...props}
          {...inputProps}
          classNames={{ body: styles.body() }}
          format="hex"
          swatches={[
            '#2e2e2e',
            '#868e96',
            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#fd7e14'
          ]}
          onChange={handleChange}
        />
      </Popover.Dropdown>
    </Popover>
  )
}
