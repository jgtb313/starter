import { z } from '@starter/schema'

export type RequestSchemaInput = {
  query?: z.ZodType
  params?: z.ZodType
  body?: z.ZodType
}

export type RequestInput<T extends RequestSchemaInput> = {
  query: T['query'] extends z.ZodType ? z.infer<T['query']> : undefined
  params: T['params'] extends z.ZodType ? z.infer<T['params']> : undefined
  body: T['body'] extends z.ZodType ? z.infer<T['body']> : undefined
}
