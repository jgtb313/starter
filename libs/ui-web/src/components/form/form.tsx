import { PropsWithChildren } from 'react'
import { FormProvider, FieldValues } from 'react-hook-form'

import { FormProps } from './form.types'

export const Form = <T extends FieldValues>({ id, onSubmit, children, ...props }: PropsWithChildren<FormProps<T>>) => {
  return (
    <FormProvider {...props}>
      <form id={id} onSubmit={props.handleSubmit((values) => onSubmit?.(values as T), console.log)}>
        {children}
      </form>
    </FormProvider>
  )
}
