import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { TestProvider } from '@/tests'
import { InputProps } from './Input.types'
import { Form } from '../Form'
import { FormProps } from '../Form.types'

type Props = {
  form?: Omit<FormProps<{}>, 'children'>
  input: InputProps
}

const renderComponent = ({ form, input }: Props) => {
  return render(
    <TestProvider>
      <Form {...form}>{() => <Form.Input data-testid="input" {...input} />}</Form>
    </TestProvider>,
  )
}

describe('<Input />', () => {
  it('should <Input /> render properly', () => {
    renderComponent({
      input: {
        name: 'name',
        label: 'Input label',
        placeholder: 'Input placeholder',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByLabelText('Input label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Input placeholder')).toBeInTheDocument()
  })

  it('should <Input /> render properly with default value defined', () => {
    renderComponent({
      form: {
        initialValues: {
          name: 'John Doe',
        },
      },
      input: {
        name: 'name',
        label: 'Input label',
        placeholder: 'Input placeholder',
      },
    })

    expect(screen.getByTestId('input')).toHaveValue('John Doe')
  })

  it('should <Input /> render disabled', () => {
    renderComponent({
      input: {
        name: 'name',
        disabled: true,
      },
    })

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should <Input /> calls onChange when input changes', async () => {
    const onChangeMock = vi.fn()

    renderComponent({
      form: {
        initialValues: {
          name: 'Initial Value',
        },
      },
      input: {
        name: 'name',
        onChange: onChangeMock,
      },
    })

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'New Value' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('New Value')
    expect(input).toHaveValue('New Value')
  })

  it('should <Input /> calls onBlur when input loses focus', async () => {
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

  it.skip('should <Input /> supports debounce functionality', async () => {
    const onChangeMock = vi.fn()

    renderComponent({
      input: {
        name: 'name',
        debounce: true,
      },
    })

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'debounced value' } })

    expect(onChangeMock).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1)
      expect(onChangeMock).toHaveBeenCalledWith('debounced value')
    }, 200)
  })
})
