import 'dayjs/locale/pt-br'

import { useImperativeHandle, useRef, forwardRef, Ref } from 'react'
import { Flex } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { DatesProvider } from '@mantine/dates'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { cnBase } from 'tailwind-variants'

import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'
import { ColorInput } from './ColorInput'
import { CurrencyInput } from './CurrencyInput'
import { DateInput } from './DateInput'
import { DocumentInput } from './DocumentInput'
import { Input } from './Input'
import { MaskInput } from './MaskInput'
import { PasswordInput } from './PasswordInput'
import { PhoneInput } from './PhoneInput'
import { PinInput } from './PinInput'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'
import { Switch } from './Switch'
import { Textarea } from './Textarea'
import { Upload } from './Upload'
import { FormProvider, useMantineForm } from './Form.hooks'
import { FormStyles } from './Form.styles'
import { FormProps, FormRef } from './Form.types'

// const Checkbox = lazy(async () => ({
//   default: (await import('./Checkbox/Checkbox')).Checkbox
// }))
// const CheckboxGroup = lazy(async () => ({
//   default: (await import('./CheckboxGroup/CheckboxGroup')).CheckboxGroup
// }))
// const ColorInput = lazy(async () => ({
//   default: (await import('./ColorInput/ColorInput')).ColorInput
// }))
// const CurrencyInput = lazy(async () => ({
//   default: (await import('./CurrencyInput/CurrencyInput')).CurrencyInput
// }))
// const DateInput = lazy(async () => ({
//   default: (await import('./DateInput/DateInput')).DateInput
// }))
// const DocumentInput = lazy(async () => ({
//   default: (await import('./DocumentInput/DocumentInput')).DocumentInput
// }))
// const Input = lazy(async () => ({
//   default: (await import('./Input/Input')).Input
// }))
// const MaskInput = lazy(async () => ({
//   default: (await import('./MaskInput/MaskInput')).MaskInput
// }))
// const PasswordInput = lazy(async () => ({
//   default: (await import('./PasswordInput/PasswordInput')).PasswordInput
// }))
// const PhoneInput = lazy(async () => ({
//   default: (await import('./PhoneInput/PhoneInput')).PhoneInput
// }))
// const PinInput = lazy(async () => ({
//   default: (await import('./PinInput/PinInput')).PinInput
// }))
// const Radio = lazy(async () => ({
//   default: (await import('./Radio/Radio')).Radio
// }))
// const RadioGroup = lazy(async () => ({
//   default: (await import('./RadioGroup/RadioGroup')).RadioGroup
// }))
// const Select = lazy(async () => ({
//   default: (await import('./Select/Select')).Select
// }))
// const Switch = lazy(async () => ({
//   default: (await import('./Switch/Switch')).Switch
// }))
// const Textarea = lazy(async () => ({
//   default: (await import('./Textarea/Textarea')).Textarea
// }))
// const Upload = lazy(async () => ({
//   default: (await import('./Upload/Upload')).Upload
// }))

const BaseForm = <T extends FieldValues>(
  { flex, initialValues, schema, onSubmit = console.log, onError = console.log, children, ...props }: FormProps<T>,
  ref: Ref<FormRef<T>>
) => {
  const styles = FormStyles(props)
  const internalRef = useRef<HTMLFormElement>(null)
  const form = useMantineForm({
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    initialValues: { ...initialValues },
    validate: schema ? zodResolver(schema) : undefined
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    form.onSubmit(
      (values) => onSubmit?.(values as T),
      (errors) => onError?.(errors as Record<Path<T>, string>)
    )(event)
  }

  useImperativeHandle(ref, () => ({
    values: () => {
      const values = form.getValues() as T

      return values
    },

    update: (key, input) => {
      form.setFieldValue(key, input as PathValue<unknown, never>)
    },

    append: (key, input) => {
      const values = form.getValues() as T

      const prevValues = values[key]

      form.setFieldValue(key, [...prevValues, ...input] as PathValue<unknown, never>)
    },

    replace: (key, input, index) => {
      const values = form.getValues() as T

      const prevValues = values[key]

      form.setFieldValue(
        key,
        prevValues.map((value: T, jndex: number) => (index === jndex ? input : value))
      )
    },

    remove: (key, index) => {
      const values = form.getValues() as T

      const prevValues = values[key]

      form.setFieldValue(
        key,
        prevValues.filter((_: T, jndex: number) => index !== jndex)
      )
    },

    submit: () => {
      handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)
    },

    reset: () => {
      form.reset()
    }
  }))

  return (
    <FormProvider form={form}>
      <Flex className={cnBase(styles.root(), props.className)} flex={flex} direction="row">
        <form className="w-full" {...props} ref={internalRef} onSubmit={handleSubmit}>
          <DatesProvider settings={{ locale: 'pt-br', timezone: 'America/Sao_Paulo' }}>{children({ values: form.values as T })}</DatesProvider>
        </form>
      </Flex>
    </FormProvider>
  )
}

const ForwardedForm = forwardRef(BaseForm) as typeof BaseForm

export const Form = Object.assign(ForwardedForm, {
  Checkbox,
  CheckboxGroup,
  ColorInput,
  CurrencyInput,
  DateInput,
  DocumentInput,
  Input,
  MaskInput,
  PasswordInput,
  PhoneInput,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  Upload
})
