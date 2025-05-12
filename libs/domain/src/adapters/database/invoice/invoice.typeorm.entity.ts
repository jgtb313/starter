import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { Invoice, InvoiceCard, InvoicePix, InvoiceBoleto, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  invoiceId: Invoice['invoiceId']

  @Column({ type: 'uuid' })
  workspaceId: Invoice['workspaceId']

  @Column({ type: 'uuid' })
  subscriptionId: Invoice['subscriptionId']

  @Column({ type: 'varchar' })
  externalId: Invoice['externalId']

  @Column({ type: 'varchar' })
  description: Invoice['description']

  @Column({ type: 'enum', enum: RecurrencePaymentMethodEnum })
  paymentMethod: Invoice['paymentMethod']

  @Column({ type: 'json', nullable: true })
  card?: InvoiceCard['card']

  @Column({ type: 'json', nullable: true })
  pix?: InvoicePix['pix']

  @Column({ type: 'json', nullable: true })
  boleto?: InvoiceBoleto['boleto']

  @Column({ type: 'int' })
  amount: Invoice['amount']

  @Column({
    type: 'timestamp',
  })
  issuedAt: Invoice['issuedAt']

  @Column({
    type: 'timestamp',
  })
  dueDate: Invoice['dueDate']

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  paidAt: Invoice['paidAt']

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  canceledAt: Invoice['canceledAt']

  @Column({ type: 'enum', enum: InvoiceStatusEnum, default: InvoiceStatusEnum.PENDING })
  status: Invoice['status']

  @CreateDateColumn({})
  createdAt: Invoice['createdAt']

  @UpdateDateColumn({})
  updatedAt: Invoice['updatedAt']
}
