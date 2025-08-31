import { addSeconds, uuid } from '@starter/common'

import { PlanDomain } from '@/core/plan/plan.domain'
import type { PlanInput } from '@/core/plan/plan.schema'

type PlanOverrides = Partial<PlanInput>

export const makePlan = (overrides: PlanOverrides = {}) => {
	const now = new Date()

	const base: PlanInput = {
		planId: uuid(),
		externalId: uuid(),
		name: 'name',
		description: 'description',
		amount: 100,
		interval: 'MONTH',
		intervalCount: 1,
		trialDays: 7,
		features: [],
		highlight: false,
		status: 'ACTIVE',
		deletedAt: null,
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	}

	return new PlanDomain({
		...base,
		...overrides,
	})
}

export const planMocks: PlanDomain[] = [
	makePlan({
		name: 'Free Plan',
		amount: 0,
		trialDays: 0,
		interval: 'MONTH',
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 1 organization',
				props: {
					maxOrganizations: 1,
				},
			},
		],
	}),

	makePlan({
		name: 'Basic Monthly',
		amount: 2900,
		trialDays: 7,
		interval: 'MONTH',
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 3 organizations',
				props: {
					maxOrganizations: 3,
				},
			},
		],
	}),

	makePlan({
		name: 'Basic Yearly',
		amount: 29000,
		trialDays: 14,
		interval: 'YEAR',
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 5 organizations',
				props: {
					maxOrganizations: 5,
				},
			},
		],
	}),

	makePlan({
		name: 'Pro',
		amount: 9900,
		trialDays: 14,
		interval: 'MONTH',
		highlight: true,
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 10 organizations',
				props: {
					maxOrganizations: 10,
				},
			},
		],
	}),

	makePlan({
		name: 'Enterprise',
		amount: 19900,
		trialDays: 30,
		interval: 'MONTH',
		highlight: true,
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 50 organizations',
				props: {
					maxOrganizations: 50,
				},
			},
		],
	}),

	makePlan({
		name: 'Inactive Plan',
		amount: 5900,
		trialDays: 5,
		interval: 'WEEK',
		status: 'INACTIVE',
		externalId: uuid(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 2 organizations',
				props: {
					maxOrganizations: 2,
				},
			},
		],
	}),

	makePlan({
		name: 'Promo Plan',
		amount: 900,
		trialDays: 3,
		interval: 'MONTH',
		highlight: true,
		externalId: uuid(),
		createdAt: addSeconds(new Date(), -86400).toISOString(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 3 organizations',
				props: {
					maxOrganizations: 3,
				},
			},
		],
	}),

	makePlan({
		name: 'Deleted Plan',
		amount: 4900,
		trialDays: 0,
		interval: 'MONTH',
		externalId: uuid(),
		deletedAt: new Date().toISOString(),
		features: [
			{
				code: 'ORGANIZATION_COUNT',
				description: 'Allows up to 1 organization',
				props: {
					maxOrganizations: 1,
				},
			},
		],
	}),
]
