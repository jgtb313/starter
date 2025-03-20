import { FieldValues, UseFormProps, useForm as useReactHookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from '@starter/schema'

export const useForm = <T extends FieldValues>({ schema, ...props }: UseFormProps<T> & { schema?: ZodSchema }) => {
  return useReactHookForm<T>({
    ...props,
    resolver: schema ? zodResolver(schema) : undefined,
  })
}
