import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Invoice, InvoiceCreditCard, InvoiceDebitCard, InvoicePix, InvoiceBoleto, InvoicePaymentMethodEnum, InvoiceStatusEnum } from '@/schemas'

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  invoiceId: Invoice['invoiceId']

  @Column({ type: 'uuid' })
  workspaceId: Invoice['workspaceId']

  @Column({ type: 'uuid' })
  subscriptionId: Invoice['subscriptionId']

  @Column({ type: 'varchar' })
  description: Invoice['description']

  @Column({ type: 'enum', enum: InvoicePaymentMethodEnum })
  paymentMethod: Invoice['paymentMethod']

  @Column({ type: 'json', nullable: true })
  creditCard?: InvoiceCreditCard['creditCard']

  @Column({ type: 'json', nullable: true })
  debitCard?: InvoiceDebitCard['debitCard']

  @Column({ type: 'varchar', nullable: true })
  pixQrCode?: InvoicePix['pixQrCode']

  @Column({ type: 'varchar', nullable: true })
  boletoURL?: InvoiceBoleto['boletoURL']

  @Column({ type: 'varchar', nullable: true })
  boletoInstructions?: InvoiceBoleto['boletoInstructions']

  @Column({ type: 'timestamp', nullable: true })
  boletoDueDate?: InvoiceBoleto['boletoDueDate']

  @Column({ type: 'int' })
  amount: Invoice['amount']

  @Column({ type: 'timestamp' })
  issuedAt: Invoice['issuedAt']

  @Column({ type: 'timestamp' })
  billingDueDate: Invoice['billingDueDate']

  @Column({ type: 'timestamp', nullable: true })
  canceledAt: Invoice['canceledAt']

  @Column({ type: 'enum', enum: InvoiceStatusEnum, default: InvoiceStatusEnum.PENDING })
  status: Invoice['status']

  @CreateDateColumn()
  createdAt: Invoice['createdAt']

  @UpdateDateColumn()
  updatedAt: Invoice['updatedAt']
}
