import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'

import { APIModule } from '@/api.module'

describe('PermissionController', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				APIModule,
			],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	describe('GET /permissions', () => {
		it('should return a permission list (200)', async () => {
			const response = await request(app.getHttpServer())
				.get('/permissions')
				.query()

			expect(Array.isArray(response.body.values)).toBe(true)
			expect(response.status).toBe(200)
		})
	})

	// describe('GET /campaigns/:campaignId', () => {
	//   it('should return a campaign by id (200)', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     const response = await request(app.getHttpServer()).get(`/campaigns/${postResponse.body.campaignId}`)

	//     expect(response.body.campaignId).toBe(postResponse.body.campaignId)
	//     expect(response.status).toBe(200)
	//   })

	//   it('should return 404 if campaign is not found', async () => {
	//     const response = await request(app.getHttpServer()).get(`/campaigns/68e99e84-d79a-46fe-947d-0ef7a2b71eff`)

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 404 if campaign has been deleted', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     await request(app.getHttpServer()).delete(`/campaigns/${postResponse.body.campaignId}`)

	//     const response = await request(app.getHttpServer()).get(`/campaigns/${postResponse.body.campaignId}`)

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 400 if campaignId is invalid', async () => {
	//     const response = await request(app.getHttpServer()).get('/campaigns/invalid-uuid')

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors[0].message).toBe('Invalid uuid')
	//     expect(response.body.errors[0].path[0]).toBe('campaignId')
	//     expect(response.status).toBe(400)
	//   })
	// })

	// describe('POST /campaigns', () => {
	//   it('should create a campaign (201)', async () => {
	//     const response = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     expect(response.body).toHaveProperty('campaignId')
	//     expect(response.body).toHaveProperty('name')
	//     expect(response.body).toHaveProperty('category')
	//     expect(response.body).toHaveProperty('startDate')
	//     expect(response.body).toHaveProperty('endDate')
	//     expect(response.body).toHaveProperty('createdAt')
	//     expect(response.body).toHaveProperty('updatedAt')
	//     expect(response.status).toBe(201)
	//   })

	//   it('should return 400 if body is invalid', async () => {
	//     const response = await request(app.getHttpServer()).post('/campaigns').send({})

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors).toEqual(
	//       expect.arrayContaining([
	//         expect.objectContaining({
	//           code: 'invalid_type',
	//           path: ['name'],
	//           message: 'Required',
	//         }),
	//         expect.objectContaining({
	//           code: 'invalid_type',
	//           path: ['category'],
	//           message: 'Required',
	//         }),
	//         expect.objectContaining({
	//           code: 'invalid_date',
	//           path: ['startDate'],
	//           message: 'Invalid date',
	//         }),
	//         expect.objectContaining({
	//           code: 'invalid_date',
	//           path: ['endDate'],
	//           message: 'Invalid date',
	//         }),
	//       ]),
	//     )
	//     expect(response.status).toBe(400)
	//   })

	//   it('should return 400 if endDate is before startDate', async () => {
	//     const today = new Date()
	//     const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

	//     const response = await request(app.getHttpServer())
	//       .post('/campaigns')
	//       .send(
	//         makeMockCampaign({
	//           startDate: today,
	//           endDate: yesterday,
	//         }),
	//       )

	//     expect(response.status).toBe(400)
	//     expect(response.body.errors).toEqual(
	//       expect.arrayContaining([
	//         expect.objectContaining({
	//           path: ['endDate'],
	//           message: 'End date must be greater than start date.',
	//         }),
	//       ]),
	//     )
	//   })

	//   it('should return 400 if startDate is before today', async () => {
	//     const yesterday = new Date()
	//     yesterday.setDate(yesterday.getDate() - 1)
	//     yesterday.setHours(0, 0, 0, 0)

	//     const tomorrow = new Date()
	//     tomorrow.setDate(tomorrow.getDate() + 1)

	//     const response = await request(app.getHttpServer())
	//       .post('/campaigns')
	//       .send(
	//         makeMockCampaign({
	//           startDate: yesterday,
	//           endDate: tomorrow,
	//         }),
	//       )

	//     expect(response.status).toBe(400)
	//     expect(response.body.errors).toEqual(
	//       expect.arrayContaining([
	//         expect.objectContaining({
	//           path: ['startDate'],
	//           message: 'Start date must be today or later.',
	//         }),
	//       ]),
	//     )
	//   })
	// })

	// describe('PATCH /campaigns/:campaignId', () => {
	//   it('should update a campaign (200)', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     const response = await request(app.getHttpServer()).patch(`/campaigns/${postResponse.body.campaignId}`).send({
	//       name: 'CampaignUpdated',
	//     })

	//     expect(response.body.name).toBe('CampaignUpdated')
	//     expect(response.status).toBe(200)
	//   })

	//   it('should return 404 if campaign is not found', async () => {
	//     const response = await request(app.getHttpServer()).patch(`/campaigns/68e99e84-d79a-46fe-947d-0ef7a2b71eff`).send(makeMockCampaign())

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 400 if body or campaignId is invalid', async () => {
	//     const response = await request(app.getHttpServer()).patch('/campaigns/invalid-uuid').send({})

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors[0].message).toBe('Invalid uuid')
	//     expect(response.body.errors[0].path[0]).toBe('campaignId')
	//     expect(response.status).toBe(400)
	//   })
	// })

	// describe('PATCH /campaigns/:campaignId/active', () => {
	//   it('should activate a campaign (200)', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     await request(app.getHttpServer()).patch(`/campaigns/${postResponse.body.campaignId}/close`)

	//     const response = await request(app.getHttpServer()).patch(`/campaigns/${postResponse.body.campaignId}/active`)

	//     expect(response.body.status).toBe(CampaignStatus.ACTIVE)
	//     expect(response.status).toBe(200)
	//   })

	//   it('should return 404 if campaign is not found', async () => {
	//     const response = await request(app.getHttpServer()).patch(`/campaigns/68e99e84-d79a-46fe-947d-0ef7a2b71eff/active`)

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 400 if campaignId is invalid', async () => {
	//     const response = await request(app.getHttpServer()).patch('/campaigns/invalid-uuid/active')

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors[0].message).toBe('Invalid uuid')
	//     expect(response.body.errors[0].path[0]).toBe('campaignId')
	//     expect(response.status).toBe(400)
	//   })

	//   it('should return 409 if campaign is already expired', async () => {
	//     const campaignExpired = makeMockCampaign({
	//       status: CampaignStatus.EXPIRED,
	//     })

	//     await campaignRepository.create(campaignExpired)

	//     const response = await request(app.getHttpServer()).patch(`/campaigns/${campaignExpired.campaignId}/active`)

	//     expect(response.status).toBe(409)
	//   })
	// })

	// describe('PATCH /campaigns/:campaignId/close', () => {
	//   it('should close a campaign (200)', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     const response = await request(app.getHttpServer()).patch(`/campaigns/${postResponse.body.campaignId}/close`)

	//     expect(response.body.status).toBe(CampaignStatus.CLOSED)
	//     expect(response.status).toBe(200)
	//   })

	//   it('should return 404 if campaign is not found', async () => {
	//     const response = await request(app.getHttpServer()).patch(`/campaigns/68e99e84-d79a-46fe-947d-0ef7a2b71eff/close`)

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 400 if campaignId is invalid', async () => {
	//     const response = await request(app.getHttpServer()).patch('/campaigns/invalid-uuid/close')

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors[0].message).toBe('Invalid uuid')
	//     expect(response.body.errors[0].path[0]).toBe('campaignId')
	//     expect(response.status).toBe(400)
	//   })

	//   it('should return 409 if campaign is already expired', async () => {
	//     const campaignExpired = makeMockCampaign({
	//       status: CampaignStatus.EXPIRED,
	//     })

	//     await campaignRepository.create(campaignExpired)

	//     const response = await request(app.getHttpServer()).patch(`/campaigns/${campaignExpired.campaignId}/close`)

	//     expect(response.status).toBe(409)
	//   })
	// })

	// describe('DELETE /campaigns/:campaignId', () => {
	//   it('should delete a campaign (204)', async () => {
	//     const postResponse = await request(app.getHttpServer()).post('/campaigns').send(makeMockCampaign())

	//     const response = await request(app.getHttpServer()).delete(`/campaigns/${postResponse.body.campaignId}`)

	//     expect(response.status).toBe(204)
	//   })

	//   it('should return 404 if campaign is not found', async () => {
	//     const response = await request(app.getHttpServer()).delete(`/campaigns/68e99e84-d79a-46fe-947d-0ef7a2b71eff`)

	//     expect(response.status).toBe(404)
	//   })

	//   it('should return 400 if campaignId is invalid', async () => {
	//     const response = await request(app.getHttpServer()).delete('/campaigns/invalid-uuid')

	//     expect(response.body.message).toBe('Validation failed')
	//     expect(response.body.errors[0].message).toBe('Invalid uuid')
	//     expect(response.body.errors[0].path[0]).toBe('campaignId')
	//     expect(response.status).toBe(400)
	//   })
	// })
})
