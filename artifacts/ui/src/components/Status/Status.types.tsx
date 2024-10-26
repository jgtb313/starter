import { BaseComponent } from '@/support/types'
import { StatusVariants } from './Status.styles'

export type StatusEnum =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'CANCELED'
  | 'CONCLUDED'
  | 'WAITING_PAYMENT'
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'REFUSED'
  | 'ENDED'
  | 'TRIALING'
  | 'PENDING'
  | 'PROCESSING'
  | 'TRANSFERRED'
  | 'FAILED'
  | 'CLOSED'
  | 'DELETED'

export const StatusLabels: Record<StatusEnum, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  CANCELED: 'Cancelado',
  CONCLUDED: 'Concluído',
  WAITING_PAYMENT: 'Esperando pagamento',
  PENDING_PAYMENT: 'Pagamento pendente',
  PAID: 'Pago',
  REFUSED: 'Recusado',
  ENDED: 'Finalizado',
  TRIALING: 'Em teste',
  PENDING: 'Pendente',
  PROCESSING: 'Processando',
  TRANSFERRED: 'Transferido',
  FAILED: 'Falha',
  CLOSED: 'Fechado',
  DELETED: 'Deletado',
}

export const StatusColors: Record<StatusEnum, string> = {
  ACTIVE: 'green',
  INACTIVE: 'orange',
  CANCELED: 'red',
  CONCLUDED: 'green',
  WAITING_PAYMENT: 'orange',
  PENDING_PAYMENT: 'orange',
  PAID: 'green',
  REFUSED: 'red',
  ENDED: 'red',
  TRIALING: 'orange',
  PENDING: 'orange',
  PROCESSING: 'blue',
  TRANSFERRED: 'green',
  FAILED: 'red',
  CLOSED: 'red',
  DELETED: 'red',
}

export type StatusProps = BaseComponent<{
  variant: StatusEnum
}>
