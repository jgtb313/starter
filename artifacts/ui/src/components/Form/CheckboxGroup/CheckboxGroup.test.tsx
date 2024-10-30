import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { TestProvider } from '@/tests'
import { CheckboxGroupProps } from './CheckboxGroup.types'
import { Form } from '../Form'
import { FormProps } from '../Form.types'

type Props = {
  form?: Omit<FormProps<{}>, 'children'>
  input: CheckboxGroupProps
}

const renderComponent = ({ form, input }: Props) => {
  return render(
    <TestProvider>
      <Form {...form}>{() => <Form.CheckboxGroup data-testid="input" {...input} />}</Form>
    </TestProvider>,
  )
}

describe('<CheckboxGroup />', () => {
  it('should <CheckboxGroup /> render properly', () => {
    renderComponent({
      input: {
        name: 'name',
        label: 'Input label',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByLabelText('Input label')).toBeInTheDocument()
  })

  it('should <CheckboxGroup /> render properly with default value defined', () => {
    renderComponent({
      form: {
        initialValues: {
          name: ['VALUE_1'],
        },
      },
      input: {
        name: 'name',
        label: 'Input label',
        items: [
          {
            label: 'Label 1',
            value: 'VALUE_1',
          },
          {
            label: 'Label 2',
            value: 'VALUE_2',
          },
          {
            label: 'Label 3',
            value: 'VALUE_3',
          },
        ],
      },
    })

    expect(screen.getByTestId('VALUE_1')).toBeChecked()
    expect(screen.getByTestId('VALUE_2')).not.toBeChecked()
  })

  it('should <CheckboxGroup /> render disabled', () => {
    renderComponent({
      form: {
        initialValues: {},
      },
      input: {
        name: 'name',
        label: 'Input label',
        items: [
          {
            label: 'Label 1',
            value: 'VALUE_1',
            disabled: true,
          },
        ],
      },
    })

    expect(screen.getByTestId('VALUE_1')).toBeDisabled()
  })

  it('should <CheckboxGroup /> calls onChange when input has been clicked', async () => {
    const onChangeMock = vi.fn()

    renderComponent({
      form: {
        initialValues: {
          name: [],
        },
      },
      input: {
        name: 'name',
        label: 'Input label',
        items: [
          {
            label: 'Label 1',
            value: 'VALUE_1',
          },
        ],
        onChange: onChangeMock,
      },
    })

    const input = screen.getByTestId('VALUE_1')
    fireEvent.click(input)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(['VALUE_1'])
    expect(input).toBeChecked()
  })
})
