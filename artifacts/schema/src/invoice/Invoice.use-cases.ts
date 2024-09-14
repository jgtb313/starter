import { z } from '@/zod'

import { PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { InvoiceSchema } from './Invoice.schema'

export const IndexInvoicesSchema = InvoiceSchema.pick({})
  .partial()
  .and(SortSchema)
  .and(
    z
      .object({
        filter: z.string()
      })
      .partial()
  )
export const IndexInvoicesSchemaOutput = z.array(InvoiceSchema)
export type IndexInvoicesInput = z.infer<typeof IndexInvoicesSchema>
export type IndexInvoicesOutput = Promise<z.infer<typeof IndexInvoicesSchemaOutput>>

export const ListInvoicesSchema = InvoiceSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: z.string()
      })
      .partial()
  )
export const ListInvoicesSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(InvoiceSchema).default([]) })
export type ListInvoicesInput = z.infer<typeof ListInvoicesSchema>
export type ListInvoicesOutput = Promise<z.infer<typeof ListInvoicesSchemaOutput>>

export const GetInvoiceByIdSchema = InvoiceSchema.pick({
  id: true
})
export const GetInvoiceByIdSchemaOutput = InvoiceSchema
export type GetInvoiceByIdInput = z.infer<typeof GetInvoiceByIdSchema>
export type GetInvoiceByIdOutput = Promise<z.infer<typeof GetInvoiceByIdSchemaOutput>>

export const CreateInvoiceSchema = InvoiceSchema.pick({})
export const CreateInvoiceSchemaOutput = InvoiceSchema
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>
export type CreateInvoiceOutput = Promise<z.infer<typeof CreateInvoiceSchemaOutput>>

export const UpdateInvoiceSchema = InvoiceSchema.pick({
  id: true
}).and(InvoiceSchema.pick({}).partial())
export const UpdateInvoiceSchemaOutput = InvoiceSchema
export type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceSchema>
export type UpdateInvoiceOutput = Promise<z.infer<typeof UpdateInvoiceSchemaOutput>>

export const ActiveInvoiceSchema = InvoiceSchema.pick({
  id: true
})
export const ActiveInvoiceSchemaOutput = InvoiceSchema
export type ActiveInvoiceInput = z.infer<typeof ActiveInvoiceSchema>
export type ActiveInvoiceOutput = Promise<z.infer<typeof ActiveInvoiceSchemaOutput>>

export const InactiveInvoiceSchema = InvoiceSchema.pick({
  id: true
})
export const InactiveInvoiceSchemaOutput = InvoiceSchema
export type InactiveInvoiceInput = z.infer<typeof InactiveInvoiceSchema>
export type InactiveInvoiceOutput = Promise<z.infer<typeof InactiveInvoiceSchema>>

export const DeleteInvoiceSchema = InvoiceSchema.pick({
  id: true
})
export const DeleteInvoiceSchemaOutput = InvoiceSchema
export type DeleteInvoiceInput = z.infer<typeof DeleteInvoiceSchema>
export type DeleteInvoiceOutput = Promise<z.infer<typeof DeleteInvoiceSchema>>
