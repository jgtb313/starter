import { FormProps } from '@ss/components'

export type StoreFormProps<T> = Pick<FormProps<T>, 'id' | 'initialValues' | 'schema' | 'onSubmit'>
