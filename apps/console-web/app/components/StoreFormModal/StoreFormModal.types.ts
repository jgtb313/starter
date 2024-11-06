import { ModalRenderer, ModalRendererProps } from '@ss/components'
import { BooleanKeys } from '@ss/shared'

import { StoreState } from '~/stores'
import { StoreFormProps } from '../StoreForm/StoreForm.types'

export type StoreFormModalRendererCallback<T> = ModalRendererProps<StoreFormProps<T>>

export type StoreFormModalRendererProps<T> = StoreFormProps<T> & {
  modalTitle: string
  submitButtonTitle: string
  loadingSelector?: BooleanKeys<StoreState>
  children: ModalRenderer<StoreFormProps<T>>
}

export type StoreFormModalProps<T> = Omit<StoreFormModalRendererProps<T>, 'children'>
