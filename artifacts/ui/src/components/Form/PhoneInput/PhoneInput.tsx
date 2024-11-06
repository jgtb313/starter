import { useState, useMemo, forwardRef, Ref } from 'react'
import { Flex, Menu, Text, InputLabel } from '@mantine/core'
import { useDisclosure, useWindowEvent } from '@mantine/hooks'
import { countriesPhone } from '@starter/shared'

import { useMount } from '@/hooks'
import { Icon } from '../../Icon'
import { useInputForm } from '../Form.hooks'
import { MaskInput, MaskInputProps } from '../MaskInput'
import { PhoneInputStyles } from './PhoneInput.styles'
import { PhoneInputProps } from './PhoneInput.types'

type CountriesProps = { onChange: (value: string) => void }

const Countries = ({ onChange }: CountriesProps) => {
  const [query, setQuery] = useState('')
  const options = useMemo(() => {
    if (!query) {
      return countriesPhone
    }

    return countriesPhone.filter((option) => option.name.toLowerCase().startsWith(query.toLowerCase()))
  }, [query])

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event

    if (/^[A-Za-z\s]$/.test(key)) {
      setQuery((prevQuery) => prevQuery.concat(key))
    } else if (key === 'Backspace') {
      setQuery((prevQuery) => (prevQuery ? prevQuery.slice(0, -1) : ''))
    }
  }

  useWindowEvent('keydown', handleKeyDown)

  return (
    <>
      {options.map((item, index) => (
        <Menu.Item key={index} onClick={() => onChange(item.code)}>
          <Flex direction="row" justify="space-between">
            <Flex direction="row" gap="sm">
              <Text fz={16}>{item.flag}</Text>

              <Text fz={14} c="dimmed">
                {item.name}
              </Text>
            </Flex>

            <Text fz={14} c="dimmed">
              {item.code}
            </Text>
          </Flex>
        </Menu.Item>
      ))}

      {!options.length && (
        <Menu.Item>
          <Text fz={14} ta="center" c="dimmed">
            Nenhum resultado encontrado.
          </Text>
        </Menu.Item>
      )}
    </>
  )
}

export const BasePhoneInput = ({ name, label, size = 'md', onChange, onBlur, ...props }: PhoneInputProps, ref: Ref<HTMLInputElement>) => {
  const inputProps = useInputForm(name)
  const code = useMemo(() => inputProps.value?.ddi || '+55', [inputProps.value])
  const selectedOption = useMemo(() => countriesPhone.find((option) => code === option.code), [code])
  const [focused, { open: focus, close: focusOut }] = useDisclosure()
  const styles = PhoneInputStyles({ focused })

  const handleChange: MaskInputProps['onChange'] = (value?: string) => {
    inputProps.onChange({
      ddi: code,
      number: value,
    })
    onChange?.({
      ddi: code,
      number: value,
    })
  }

  const handleBlur: MaskInputProps['onBlur'] = () => {
    inputProps.onBlur()
    onBlur?.()
    focusOut()
  }

  const handleChangeCode: CountriesProps['onChange'] = (value) => {
    inputProps.onChange({
      ddi: value,
      number: inputProps.value?.number,
    })
    onChange?.({
      ddi: value,
      number: inputProps.value?.number,
    })
  }

  const handleFocus = () => {
    focus()
  }

  useMount(() => {
    handleChangeCode(code)
  })

  return (
    <Flex w="100%" direction="column">
      <InputLabel classNames={{ label: styles.label() }} size={size}>
        {label}
      </InputLabel>

      <Flex>
        <MaskInput
          {...props}
          classNames={{
            root: styles.root(),
            input: styles.input(),
            section: styles.section(),
            wrapper: styles.wrapper(),
            error: styles.error(),
          }}
          ref={ref}
          name={`${name}.number`}
          mask={selectedOption?.mask ?? ''}
          size={size}
          leftSection={
            <Menu position="bottom-start" classNames={{ item: 'bg-transparent !border-none' }}>
              <Menu.Target>
                <Flex align="end">
                  <Flex classNames={{ root: styles.countryRoot() }} align="center" justify="space-between" direction="row" gap={8}>
                    <Flex direction="row" align="center" gap="xs">
                      <Text fz={18}>{selectedOption?.flag}</Text>

                      <Text fw={300} fz={15}>
                        {selectedOption?.code}
                      </Text>
                    </Flex>

                    <Icon name="IconCaretUpDown" width={18} height={18} strokeWidth={1.5} />
                  </Flex>
                </Flex>
              </Menu.Target>

              <Menu.Dropdown className={styles.countryDropdown()} w={350} mah={350} mt={8}>
                <Countries onChange={handleChangeCode} />
              </Menu.Dropdown>
            </Menu>
          }
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </Flex>
    </Flex>
  )
}

export const PhoneInput = forwardRef(BasePhoneInput)
