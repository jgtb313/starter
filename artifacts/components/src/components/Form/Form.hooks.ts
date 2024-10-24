import { useRef } from 'react'
import { createFormContext } from '@mantine/form'

import { FormRef } from './Form.types'

export const [FormProvider, useFormContext, useMantineForm] = createFormContext()

export const useFormInput = useFormContext

export const useInputForm = (name: string) => {
  const form = useFormContext()
  const inputProps = form.getInputProps(name)

  return {
    ...inputProps
  }
}

export const useForm = <T>() => useRef<FormRef<T>>(null)
