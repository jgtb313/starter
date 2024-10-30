import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { TestProvider } from '@/tests'
import { CurrencyInputProps } from './CurrencyInput.types'
import { Form } from '../Form'
import { FormProps } from '../Form.types'

type Props = {
  form?: Omit<FormProps<{}>, 'children'>
  input: CurrencyInputProps
}

const renderComponent = ({ form, input }: Props) => {
  return render(
    <TestProvider>
      <Form {...form}>{() => <Form.CurrencyInput data-testid="input" {...input} />}</Form>
    </TestProvider>,
  )
}

describe('<CurrencyInput />', () => {
  it('should <CurrencyInput /> render properly', () => {
    renderComponent({
      input: {
        name: 'amount',
        label: 'Input label',
        placeholder: 'Input placeholder',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByLabelText('Input label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Input placeholder')).toBeInTheDocument()
  })

  it.skip('should <CurrencyInput /> render properly with default value defined', () => {
    renderComponent({
      form: {
        initialValues: {
          amount: 10000,
        },
      },
      input: {
        name: 'amount',
        label: 'Input label',
        placeholder: 'Input placeholder',
      },
    })

    expect(screen.getByTestId('input')).toHaveValue('R$ 100,00')
  })

  it('should <CurrencyInput /> render disabled', () => {
    renderComponent({
      input: {
        name: 'name',
        disabled: true,
      },
    })

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it.skip('should <CurrencyInput /> calls onChange when input changes', async () => {
    const onChangeMock = vi.fn()

    renderComponent({
      form: {
        initialValues: {
          name: 10000,
        },
      },
      input: {
        name: 'name',
        onChange: onChangeMock,
      },
    })

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 20000 } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(20000)
    expect(input).toHaveValue('R$ 200,00')
  })

  it('should <CurrencyInput /> calls onBlur when input loses focus', async () => {
    const onBlurMock = vi.fn()

    renderComponent({
      input: {
        name: 'name',
        onBlur: onBlurMock,
      },
    })

    const input = screen.getByTestId('input')

    fireEvent.focusOut(input)

    expect(onBlurMock).toHaveBeenCalledTimes(1)
  })
})
