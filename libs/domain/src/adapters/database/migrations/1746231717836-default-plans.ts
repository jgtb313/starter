import { randomUUID } from 'crypto'

import type { MigrationInterface, QueryRunner } from 'typeorm'

export class DefaultPlans1746231717836 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const now = new Date()

		const freePlanId = randomUUID()
		const proPlanId = randomUUID()
		const enterprisePlanId = randomUUID()

		// --- PLANS ---
		await queryRunner.query(
			`
			INSERT INTO plan (plan_id, external_id, name, description, highlight, status, deleted_at, created_at, updated_at)
			VALUES
				($1, $2, $3, $4, $5, $6, $7, $8, $9),
				($10, $11, $12, $13, $14, $15, $16, $17, $18),
				($19, $20, $21, $22, $23, $24, $25, $26, $27)
			`,
			[
				// Free Plan
				freePlanId,
				'free-plan',
				'Free',
				'Ideal for individuals or small teams just getting started. Includes basic features with limited organization support.',
				false,
				'ACTIVE',
				null,
				now,
				now,
				// Pro Plan
				proPlanId,
				'pro-plan',
				'Pro',
				'Perfect for growing businesses that need more flexibility, more organizations, and premium support.',
				true,
				'ACTIVE',
				null,
				now,
				now,
				// Enterprise Plan
				enterprisePlanId,
				'enterprise-plan',
				'Enterprise',
				'Designed for large organizations that require custom integrations, unlimited scalability, and dedicated support.',
				false,
				'ACTIVE',
				null,
				now,
				now,
			],
		)

		// --- PLAN FEATURES ---
		await queryRunner.query(
			`
			INSERT INTO plan_feature (plan_feature_id, plan_id, feature, description, props, created_at, updated_at)
			VALUES
				($1, $2, $3, $4, $5, $6, $7),
				($8, $9, $10, $11, $12, $13, $14),
				($15, $16, $17, $18, $19, $20, $21)
			`,
			[
				// Free Plan
				randomUUID(),
				freePlanId,
				'ORGANIZATION_COUNT',
				'Allows up to 1 organization',
				JSON.stringify({
					maxOrganizations: 1,
				}),
				now,
				now,
				// Pro Plan
				randomUUID(),
				proPlanId,
				'ORGANIZATION_COUNT',
				'Allows up to 5 organizations',
				JSON.stringify({
					maxOrganizations: 5,
				}),
				now,
				now,
				// Enterprise Plan
				randomUUID(),
				enterprisePlanId,
				'ORGANIZATION_COUNT',
				'Allows unlimited organizations',
				JSON.stringify({
					maxOrganizations: 9999,
				}),
				now,
				now,
			],
		)

		// --- PLAN INTERVALS ---
		await queryRunner.query(
			`
			INSERT INTO plan_interval (plan_interval_id, plan_id, external_id, amount, interval, interval_count, trial_days, status, created_at, updated_at)
			VALUES
				($1, $2, $3, $4, $5, $6, $7, $8, $9, $10),
				($11, $12, $13, $14, $15, $16, $17, $18, $19, $20),
				($21, $22, $23, $24, $25, $26, $27, $28, $29, $30),
				($31, $32, $33, $34, $35, $36, $37, $38, $39, $40),
				($41, $42, $43, $44, $45, $46, $47, $48, $49, $50)
			`,
			[
				// Free Monthly
				randomUUID(),
				freePlanId,
				'free-monthly',
				0,
				'MONTH',
				1,
				0,
				'ACTIVE',
				now,
				now,
				// Pro Monthly
				randomUUID(),
				proPlanId,
				'pro-monthly',
				2999,
				'MONTH',
				1,
				7,
				'ACTIVE',
				now,
				now,
				// Pro Yearly
				randomUUID(),
				proPlanId,
				'pro-yearly',
				29999,
				'YEAR',
				1,
				7,
				'ACTIVE',
				now,
				now,
				// Enterprise Monthly
				randomUUID(),
				enterprisePlanId,
				'enterprise-monthly',
				9999,
				'MONTH',
				1,
				14,
				'ACTIVE',
				now,
				now,
				// Enterprise Yearly
				randomUUID(),
				enterprisePlanId,
				'enterprise-yearly',
				99999,
				'YEAR',
				1,
				14,
				'ACTIVE',
				now,
				now,
			],
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM plan_interval')
		await queryRunner.query('DELETE FROM plan_feature')
		await queryRunner.query('DELETE FROM plan')
	}
}
