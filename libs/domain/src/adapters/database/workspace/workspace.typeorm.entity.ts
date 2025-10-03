import type { Required } from '@starter/common'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Workspace } from '@/core/workspace/workspace.schema'

@Entity('workspaces')
export class WorkspaceEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceId: Workspace['workspaceId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	recurrenceCustomerId: Workspace['recurrenceCustomerId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	name: Workspace['name']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	email: Workspace['email']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneISO: Required<Workspace['phone']>['iso']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneDDI: Required<Workspace['phone']>['ddi']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneNumber: Required<Workspace['phone']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentType: Required<Workspace['document']>['type']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentNumber: Required<Workspace['document']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressState: Required<Workspace['address']>['state']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressCity: Required<Workspace['address']>['city']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressZipCode: Required<Workspace['address']>['zipCode']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNeighborhood: Required<Workspace['address']>['neighborhood']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressStreet: Required<Workspace['address']>['street']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNumber: Required<Workspace['address']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressComplement: Required<Workspace['address']>['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLandmark: Required<Workspace['address']>['landmark']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLat: Required<Workspace['address']>['location']['lat']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLng: Required<Workspace['address']>['location']['lng']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	logo: Workspace['logo']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	domain: Workspace['domain']

	@Column({
		type: 'simple-json',
		nullable: true,
	})
	locale: Workspace['locale']

	@Column({
		type: 'datetime',
		nullable: true,
	})
	trialEndsAt: Workspace['trialEndsAt']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	status: Workspace['status']

	@CreateDateColumn({})
	createdAt: Workspace['createdAt']

	@UpdateDateColumn({})
	updatedAt: Workspace['updatedAt']
}
