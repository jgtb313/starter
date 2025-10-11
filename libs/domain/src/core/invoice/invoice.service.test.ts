import { Test, type TestingModule } from '@nestjs/testing'
import {
	AclForbiddenException,
	NotFoundException,
} from '@starter/nestjs-error-handling'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { invoiceMocks, makeInvoice } from '@/core/invoice/invoice.mock'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { InvoiceRepositoryModule } from '@/adapters/database/invoice/invoice.repository.module'
import type { IInvoiceRepository } from '@/ports/database/invoice'

describe('InvoiceService', () => {
	let service: InvoiceService
	let invoiceRepository: IInvoiceRepository

	const workspaceServiceMock = {
		getWorkspace: vi.fn(),
	}

	const subscriptionServiceMock = {
		getSubscription: vi.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				InMemoryDatabaseModule.register(),
				InvoiceRepositoryModule,
			],
			providers: [
				InvoiceService,
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
				{
					provide: SubscriptionService,
					useValue: subscriptionServiceMock,
				},
			],
		}).compile()

		service = module.get(InvoiceService)
		invoiceRepository = module.get<IInvoiceRepository>('INVOICE_REPOSITORY')

		for (const invoice of invoiceMocks) {
			await invoiceRepository.create(invoice.state)
		}

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('InvoiceService', () => {
		describe('getPaginatedInvoices', () => {
			it.each([
				{
					input: {
						offset: 0,
						limit: 10,
					},
					length: 6,
					total: 6,
				},
				{
					input: {
						offset: 0,
						limit: 2,
					},
					length: 2,
					total: 6,
				},
			])(
				'should return paginated invoices correctly',
				async ({ input, length, total }) => {
					const result = await service.getPaginatedInvoices(input)

					expect(result.values).toHaveLength(length)
					expect(result.meta.total).toBe(total)
				},
			)
		})

		describe('getInvoice', () => {
			it('should return the invoice if it belongs to the workspace', async () => {
				const [invoice] = invoiceMocks
				const result = await service.getInvoice(invoice.state.invoiceId)

				expect(result.state.invoiceId).toBe(invoice.state.invoiceId)
			})

			it('should throw an error if the invoice does not exist', async () => {
				expect(() => service.getInvoice('invalid-invoiceId')).rejects.toThrow(
					new NotFoundException('Invoice invalid-invoiceId not found'),
				)
			})

			it('should throw AclForbiddenException if the invoice does not belong to the workspace', async () => {
				const [invoice] = invoiceMocks

				expect(() =>
					service.getInvoice({
						invoiceId: invoice.state.invoiceId,
						workspaceId: 'invalid-workspaceId',
					}),
				).rejects.toThrow(AclForbiddenException)
			})
		})

		describe('createInvoice', () => {
			it('should create a new invoice', async () => {
				workspaceServiceMock.getWorkspace.mockResolvedValue({
					workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
				})

				subscriptionServiceMock.getSubscription.mockResolvedValue({
					subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
				})

				const invoice = makeInvoice({
					workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
					subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
					paymentMethod: 'CARD',
					card: {
						token: 'tok_001',
						number: '4111 ********** 11',
						holderName: 'Alice Smith',
						expirationDate: '12/27',
					},
				})

				const result = await service.createInvoice(invoice.state)

				expect(result.state.invoiceId).toBeDefined()
			})

			it('should call getWorkspace and getSubscription with correct IDs', async () => {
				workspaceServiceMock.getWorkspace.mockResolvedValue({
					workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
				})

				subscriptionServiceMock.getSubscription.mockResolvedValue({
					subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
				})

				const invoice = makeInvoice({
					workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
					subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
					paymentMethod: 'CARD',
					card: {
						token: 'tok_001',
						number: '4111 ********** 11',
						holderName: 'Alice Smith',
						expirationDate: '12/27',
					},
				})

				await service.createInvoice(invoice.state)

				expect(workspaceServiceMock.getWorkspace).toBeCalledWith(
					'0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
				)
				expect(subscriptionServiceMock.getSubscription).toBeCalledWith(
					'126b6b16-0238-41bc-9c27-54f260b08aaa',
				)
			})
		})

		describe('updateInvoice', () => {
			it('should update the invoice with the provided input', async () => {
				const [invoice] = invoiceMocks

				const result = await service.updateInvoice(invoice.state.invoiceId, {
					status: 'CANCELED',
				})

				expect(result.state.status).toBe('CANCELED')
			})

			it('should throw an error if the invoice does not exist', async () => {
				expect(() =>
					service.updateInvoice('invalid-invoiceId', {}),
				).rejects.toThrow(
					new NotFoundException('Invoice invalid-invoiceId not found'),
				)
			})
		})
	})
})
