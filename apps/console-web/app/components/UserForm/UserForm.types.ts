import { FormProps } from '@ss/components'

export type UserFormProps<T> = Pick<FormProps<T>, 'id' | 'initialValues' | 'schema' | 'onSubmit'> & {
  type: 'create' | 'edit'
}
