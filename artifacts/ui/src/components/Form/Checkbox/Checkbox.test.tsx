import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { TestProvider } from '@/tests'
import { CheckboxProps } from './Checkbox.types'
import { Form } from '../Form'
import { FormProps } from '../Form.types'

type Props = {
  form?: Omit<FormProps<{}>, 'children'>
  input: CheckboxProps
}

const renderComponent = ({ form, input }: Props) => {
  return render(
    <TestProvider>
      <Form {...form}>{() => <Form.Checkbox data-testid="input" {...input} />}</Form>
    </TestProvider>,
  )
}

describe('<Checkbox />', () => {
  it('should <Checkbox /> render properly', () => {
    renderComponent({
      input: {
        name: 'name',
        label: 'Input label',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByLabelText('Input label')).toBeInTheDocument()
  })

  it('should <Checkbox /> render properly with default value defined', () => {
    renderComponent({
      form: {
        initialValues: {
          name: true,
        },
      },
      input: {
        name: 'name',
        label: 'Input label',
      },
    })

    expect(screen.getByTestId('input')).toBeChecked()
  })

  it('should <Checkbox /> render disabled', () => {
    renderComponent({
      input: {
        name: 'name',
        disabled: true,
      },
    })

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should <Checkbox /> calls onChange when input has been clicked', async () => {
    const onChangeMock = vi.fn()

    renderComponent({
      form: {
        initialValues: {
          name: true,
        },
      },
      input: {
        name: 'name',
        onChange: onChangeMock,
      },
    })

    const input = screen.getByTestId('input')

    fireEvent.click(input)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(false)
    expect(input).not.toBeChecked()
  })
})
