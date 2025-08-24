import { randomUUID } from 'crypto'

import type { MigrationInterface, QueryRunner } from 'typeorm'

export class DefaultPlans1746231717836 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const now = new Date()

		await queryRunner.manager.insert('plans', [
			{
				planId: randomUUID(),
				externalId: randomUUID(),
				name: 'Free',
				description: 'Free plan with limited features',
				amount: 0,
				interval: 'MONTH',
				intervalCount: 1,
				trialDays: 0,
				features: [
					{
						code: 'ORGANIZATION_COUNT',
						description: 'Maximum number of organizations',
						props: {
							maxOrganizations: 1,
						},
					},
				],
				highlight: false,
				status: 'ACTIVE',
				deletedAt: null,
				createdAt: now,
				updatedAt: now,
			},
			{
				planId: randomUUID(),
				externalId: randomUUID(),
				name: 'Professional',
				description: 'Best for small teams and growing businesses',
				amount: 4990,
				interval: 'MONTH',
				intervalCount: 1,
				trialDays: 7,
				features: [
					{
						code: 'ORGANIZATION_COUNT',
						description: 'Maximum number of organizations',
						props: {
							maxOrganizations: 5,
						},
					},
				],
				highlight: true,
				status: 'ACTIVE',
				deletedAt: null,
				createdAt: now,
				updatedAt: now,
			},
			{
				planId: randomUUID(),
				externalId: randomUUID(),
				name: 'Enterprise',
				description: 'Designed for large organizations with advanced needs',
				amount: 14990,
				interval: 'MONTH',
				intervalCount: 1,
				trialDays: 14,
				features: [
					{
						code: 'ORGANIZATION_COUNT',
						description: 'Maximum number of organizations',
						props: {
							maxOrganizations: 50,
						},
					},
				],
				highlight: true,
				status: 'ACTIVE',
				deletedAt: null,
				createdAt: now,
				updatedAt: now,
			},
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.delete('plan', {})
	}
}
