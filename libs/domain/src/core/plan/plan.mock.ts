import { uuid } from '@starter/common'

import { PlanDomain } from '@/core/plan/plan.domain'
import type { Plan } from '@/core/plan/plan.schema'

type PlanOverrides = Partial<Plan>

export const makePlan = (overrides: PlanOverrides = {}) => {
	const now = new Date()

	const base: Plan = {
		planId: uuid(),
		externalId: uuid(),
		name: 'name',
		description: 'description',
		features: [],
		intervals: [],
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
	// makePlan({
	// 	name: 'Free Plan',
	// 	externalId: uuid(),
	// 	description: 'Free forever plan with basic features',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 1,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'free_monthly',
	// 			amount: 0,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 0,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	status: 'ACTIVE',
	// }),
	// makePlan({
	// 	name: 'Starter',
	// 	externalId: uuid(),
	// 	description: 'Perfect for small teams getting started',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 3,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'starter_monthly',
	// 			amount: 2900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 7,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'starter_yearly',
	// 			amount: 29000,
	// 			interval: 'YEAR',
	// 			intervalCount: 1,
	// 			trialDays: 14,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	status: 'ACTIVE',
	// }),
	// makePlan({
	// 	name: 'Professional',
	// 	externalId: uuid(),
	// 	description: 'For growing businesses with advanced needs',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 10,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'pro_monthly',
	// 			amount: 9900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 14,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'pro_yearly',
	// 			amount: 99000,
	// 			interval: 'YEAR',
	// 			intervalCount: 1,
	// 			trialDays: 30,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	highlight: true,
	// 	status: 'ACTIVE',
	// }),
	// makePlan({
	// 	name: 'Business',
	// 	externalId: uuid(),
	// 	description: 'Comprehensive solution for large teams',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 25,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'business_monthly',
	// 			amount: 19900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 14,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'business_yearly',
	// 			amount: 199000,
	// 			interval: 'YEAR',
	// 			intervalCount: 1,
	// 			trialDays: 30,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	highlight: true,
	// 	status: 'ACTIVE',
	// }),
	// makePlan({
	// 	name: 'Enterprise',
	// 	externalId: uuid(),
	// 	description: 'Unlimited everything for enterprise needs',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 999,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'enterprise_monthly',
	// 			amount: 49900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 30,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'enterprise_yearly',
	// 			amount: 499000,
	// 			interval: 'YEAR',
	// 			intervalCount: 1,
	// 			trialDays: 60,
	// 			status: 'ACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	highlight: true,
	// 	status: 'ACTIVE',
	// }),
	// makePlan({
	// 	name: 'Legacy Plan',
	// 	externalId: uuid(),
	// 	description: 'Old plan no longer available',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 2,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'legacy_monthly',
	// 			amount: 5900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 5,
	// 			status: 'INACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	status: 'INACTIVE',
	// }),
	// makePlan({
	// 	name: 'Beta Plan',
	// 	externalId: uuid(),
	// 	description: 'Beta testing plan',
	// 	features: [
	// 		{
	// 			planFeatureId: uuid(),
	// 			feature: 'ORGANIZATION_COUNT',
	// 			description: 'Maximum number of organizations',
	// 			props: {
	// 				maxOrganizations: 5,
	// 			},
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	intervals: [
	// 		{
	// 			planIntervalId: uuid(),
	// 			externalId: 'beta_monthly',
	// 			amount: 4900,
	// 			interval: 'MONTH',
	// 			intervalCount: 1,
	// 			trialDays: 7,
	// 			status: 'INACTIVE',
	// 			createdAt: new Date().toISOString(),
	// 			updatedAt: new Date().toISOString(),
	// 		},
	// 	],
	// 	status: 'INACTIVE',
	// }),
	// makePlan({
	// 	name: 'Deleted Plan',
	// 	externalId: uuid(),
	// 	description: 'This plan was deleted',
	// 	features: [],
	// 	intervals: [],
	// 	deletedAt: new Date().toISOString(),
	// 	status: 'INACTIVE',
	// }),
]
