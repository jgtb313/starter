import { PropsWithChildren, useId, useMemo } from 'react'
import { Flex, Drawer, Form, Button, Typography, Icon, drawer, InputProps, Pill } from '@ss/components'
import { formatDateRange, get, omit } from '@ss/shared'

import { useSearch, SearchContext } from './Search.context'
import { SearchProps, SearchInputProps, SearchContextProps } from './Search.types'

const SearchContent = <T,>({ state, items = [], updateState, cancel }: Pick<SearchContextProps<T>, 'state' | 'items' | 'updateState' | 'cancel'>) => {
  const id = useId()

  const handleSubmit = (values: unknown) => {
    updateState?.(values as T)
  }

  return (
    <Drawer.Content>
      <Drawer.Header>Filtro</Drawer.Header>

      <Drawer.Body>
        <Form id={id} initialValues={state as Record<string, unknown>} onSubmit={handleSubmit}>
          {() => (
            <Flex direction="column" gap={16}>
              {items.map((item, index) => {
                const props = {
                  name: item.name.toString(),
                  label: item.label,
                  placeholder: item.placeholder
                }

                switch (item.component) {
                  case 'Input':
                    return <Form.Input key={index} {...props} {...item.props} />
                  case 'Checkbox':
                    return <Form.Checkbox key={index} {...props} {...item.props} />
                  case 'CheckboxGroup':
                    return <Form.CheckboxGroup key={index} {...props} {...item.props} />
                  case 'ColorInput':
                    return <Form.ColorInput key={index} {...props} {...item.props} />
                  case 'CurrencyInput':
                    return <Form.CurrencyInput key={index} {...props} {...item.props} />
                  case 'DateInput':
                    return <Form.DateInput key={index} {...props} {...item.props} />
                  case 'DocumentInput':
                    return <Form.DocumentInput key={index} {...props} {...item.props} />
                  case 'MaskInput':
                    return <Form.MaskInput key={index} {...props} {...item.props} mask={item.props?.mask ?? ''} />
                  case 'PasswordInput':
                    return <Form.PasswordInput key={index} {...props} {...item.props} />
                  case 'PhoneInput':
                    return <Form.PhoneInput key={index} {...props} {...item.props} />
                  case 'PinInput':
                    return <Form.PinInput key={index} {...props} {...item.props} />
                  case 'Radio':
                    return <Form.Radio key={index} {...props} {...item.props} />
                  case 'RadioGroup':
                    return <Form.RadioGroup key={index} {...props} {...item.props} />
                  case 'Select':
                    return <Form.Select key={index} {...props} {...item.props} />
                  case 'Switch':
                    return <Form.Switch key={index} {...props} {...item.props} />
                  case 'Textarea':
                    return <Form.Textarea key={index} {...props} {...item.props} />
                  case 'Upload':
                    return <Form.Upload key={index} {...props} {...item.props} title={item.props?.title ?? ''} />
                  default:
                    return <></>
                }
              })}
            </Flex>
          )}
        </Form>
      </Drawer.Body>

      <Drawer.Footer justify="end">
        <Flex direction="row" justify="end" gap={16}>
          <Button color="gray" variant="transparent" onClick={cancel}>
            Cancelar
          </Button>

          <Button form={id} type="submit">
            Aplicar
          </Button>
        </Flex>
      </Drawer.Footer>
    </Drawer.Content>
  )
}

export const Search = <T,>({ value, items = [], onChange, children }: SearchProps<T>) => {
  const id = useId()

  const open = () => {
    drawer.open({
      id,
      children: <SearchContent<T> state={value} items={items} updateState={handleApply} cancel={close} />
    })
  }

  const close = () => {
    drawer.close(id)
  }

  const handleFilterChange: InputProps['onChange'] = (input) => {
    const newState = { ...value, filter: input } as T

    onChange?.(newState)
  }

  const handleRemove = (path: string) => {
    const newState = omit(value ?? {}, [path]) as T

    onChange?.(newState)
  }

  const handleApply = (value: T) => {
    onChange?.(value)

    close()
  }

  const context: SearchContextProps<T> = {
    state: value,
    items,
    updateFilter: handleFilterChange,
    updateState: handleApply,
    removePath: handleRemove,
    cancel: close
  }

  return (
    <SearchContext.Provider value={context}>
      {children({
        open,
        close
      })}
    </SearchContext.Provider>
  )
}

Search.Input = <T,>({ placeholder, onChange, children }: PropsWithChildren<SearchInputProps>) => {
  const { state, updateFilter } = useSearch<T>()

  const handleChange: InputProps['onChange'] = (value) => {
    updateFilter(value)
    onChange?.(value)
  }

  return (
    <Flex w="100%" direction="column" gap={10}>
      <Flex w="100%" direction="row" align="center" gap={16}>
        <Form initialValues={state ?? {}}>
          {() => (
            <Form.Input name="filter" placeholder={placeholder} size="lg" leftSection={<Icon name="Search" />} onChange={handleChange} debounce />
          )}
        </Form>

        {children}
      </Flex>
    </Flex>
  )
}

Search.Output = <T,>() => {
  const { removePath, state, items = [] } = useSearch<T>()

  const selecteds = useMemo(() => {
    return items.reduce((result, { component, name, label, props }) => {
      const itemValue = state?.[name]

      if (!itemValue) {
        return result
      }

      if (component === 'DateInput') {
        const [startAt, endAt] = itemValue.toString().split(',')

        const text = formatDateRange(new Date(startAt), new Date(endAt), 'dd/MM/yyyy')

        return [...result, { name, label, text }]
      }

      if (component === 'Select') {
        const optionLabel = (props?.optionLabel ?? 'label').toString()
        const optionValue = (props?.optionValue ?? 'value').toString()

        const option = props?.options?.find((option) => get(option, optionValue) === itemValue)
        const text: string = get(option, optionLabel)

        return [...result, { name, label, text }]
      }

      return [...result, { name, label, text: itemValue }]
    }, [] as any[])
  }, [state])

  if (!selecteds.length) {
    return <></>
  }

  return (
    <Flex direction="row" gap={8}>
      <Typography c="dimmed" tt="uppercase">
        Filtros ativos:
      </Typography>

      <Flex direction="row">
        {selecteds.map((selected) => (
          <Pill key={selected.name} onRemove={() => removePath(selected.name)} closable>
            {selected.text}
          </Pill>
        ))}
      </Flex>
    </Flex>
  )
}
