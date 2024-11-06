import { create } from 'zustand'
import client from '@ss/client'
import { BatchInvoicesStatusEnum } from '@ss/schema'
import { makeRequest, toast } from '@ss/components'

import { InvoiceState } from './Invoice.types'

const store = create<InvoiceState>()

export const useInvoice = store((set) => ({
  invoices: undefined,
  loadingInvoices: false,
  loadingBatchInvoice: false,
  loadingDeleteInvoice: false,

  async fetchInvoices(params, options) {
    return makeRequest(client.invoice.list, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingInvoices: true
        }),
      onSuccess: (invoices) => {
        set({
          invoices
        })
      },
      onFinally: () =>
        set({
          loadingInvoices: false
        })
    })
  },

  async batchInvoices(params, options) {
    return makeRequest(client.invoice.batch, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingBatchInvoice: true
        }),
      onSuccess: ({ status }) => {
        if (status === BatchInvoicesStatusEnum.ALL_SAVED) {
          toast.success({
            message: 'Notas criadas com sucesso.'
          })
        } else if (status === BatchInvoicesStatusEnum.ALL_PREVIOUSLY_SAVED) {
          toast.success({
            message: 'Notas previamentes salvas.'
          })
        } else if (status === BatchInvoicesStatusEnum.PARTIAL_SAVED) {
          toast.warning({
            message: 'Notas criadas parcialmente.'
          })
        } else {
          toast.error({
            message: 'Nenhuma nota foi criada.'
          })
        }
      },
      onFinally: () =>
        set({
          loadingBatchInvoice: false
        })
    })
  },

  async deleteInvoice(params, options) {
    return makeRequest(client.invoice.destroy, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeleteInvoice: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Nota excluída com sucesso.'
        })
      },
      onFinally: () =>
        set({
          loadingDeleteInvoice: false
        })
    })
  }
}))
