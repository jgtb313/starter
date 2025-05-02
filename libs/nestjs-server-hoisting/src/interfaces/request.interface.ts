import { z, PaginationSchema } from '@starter/schema'

export type RequestSchemaInput = {
  query?: z.ZodType
  params?: z.ZodType
  body?: z.ZodType
}

export type RequestInput<T extends RequestSchemaInput> = {
  query: T['query'] extends z.ZodType ? Omit<z.infer<T['query']>, 'limit' | 'offset'> : undefined
  params: T['params'] extends z.ZodType ? z.infer<T['params']> : undefined
  body: T['body'] extends z.ZodType ? z.infer<T['body']> : undefined
  pagination: z.infer<typeof PaginationSchema>
}
