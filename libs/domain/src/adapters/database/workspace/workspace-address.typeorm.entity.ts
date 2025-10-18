import type { Required } from '@starter/common'

import {
	AfterLoad,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Workspace } from '@/core/workspace/workspace.schema'

import type { WorkspaceEntity } from './workspace.typeorm.entity'

type WorkspaceAddress = Required<Workspace['address']>

@Entity('workspace_address')
export class WorkspaceAddressEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceAddressId: string

	@OneToOne(
		'WorkspaceEntity',
		(workspace: WorkspaceEntity) => workspace.workspaceAddress,
	)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity

	@Column({
		type: 'varchar',
		name: 'state',
	})
	state: WorkspaceAddress['state']

	@Column({
		type: 'varchar',
	})
	city: WorkspaceAddress['city']

	@Column({
		type: 'varchar',
	})
	zipCode: WorkspaceAddress['zipCode']

	@Column({
		type: 'varchar',
	})
	neighborhood: WorkspaceAddress['neighborhood']

	@Column({
		type: 'varchar',
	})
	street: WorkspaceAddress['street']

	@Column({
		type: 'varchar',
	})
	number: WorkspaceAddress['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	complement: WorkspaceAddress['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	landmark: WorkspaceAddress['landmark']

	location: WorkspaceAddress['location']

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 7,
	})
	lat: string

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 7,
	})
	lng: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@AfterLoad()
	loadDocument() {
		this.location = {
			lat: this.lat,
			lng: this.lng,
		}
	}
}
