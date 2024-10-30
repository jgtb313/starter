import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { TestProvider } from '@/tests'
import { ColorInputProps } from './ColorInput.types'
import { Form } from '../Form'
import { FormProps } from '../Form.types'

type Props = {
  form?: Omit<FormProps<{}>, 'children'>
  input: ColorInputProps
}

const renderComponent = ({ form, input }: Props) => {
  return render(
    <TestProvider>
      <Form {...form}>{() => <Form.ColorInput data-testid="input" {...input} />}</Form>
    </TestProvider>,
  )
}

describe('<ColorInput />', () => {
  it('should <ColorInput /> render properly', () => {
    renderComponent({
      input: {
        name: 'name',
        label: 'Input label',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByLabelText('Input label')).toBeInTheDocument()
  })

  it('should <ColorInput /> render properly without label defined', () => {
    renderComponent({
      input: {
        name: 'name',
      },
    })

    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.queryByText('Input label')).not.toBeInTheDocument()
  })

  it.skip('should <ColorInput /> render properly with default value defined', () => {
    renderComponent({
      form: {
        initialValues: {
          name: '#4c6ef5',
        },
      },
      input: {
        name: 'name',
        label: 'Input label',
      },
    })

    expect(screen.getByTestId('input')).toContainHTML(
      '<span class="m-862f3d1b mantine-ColorSwatch-colorOverlay" style="background-color: rgb(76, 110, 245);" />',
    )
  })

  it('should <ColorInput /> render disabled', () => {
    renderComponent({
      input: {
        name: 'name',
        disabled: true,
      },
    })

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it.skip('should <ColorInput /> calls onChange when ColorSwatch has been clicked', async () => {
    const onChangeMock = vi.fn()

    const { container } = renderComponent({
      form: {
        initialValues: {},
      },
      input: {
        name: 'name',
        onChange: onChangeMock,
      },
    })

    const input = screen.getByTestId('input')
    fireEvent.click(input)

    const item = container.getElementsByClassName('mantine-ColorSwatch-root')?.[0]
    fireEvent.click(item)

    expect(onChangeMock).toBeCalledTimes(1)
  })
})
