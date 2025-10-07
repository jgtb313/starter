import type { Required } from '@starter/common'
import {
	AfterLoad,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Workspace } from '@/core/workspace/workspace.schema'

import { WorkspaceEntity } from './workspace.typeorm.entity'

type WorkspaceAddress = Required<Workspace['address']>

@Entity('workspace_addresses')
export class WorkspaceAddressEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceAddressId: string

	@OneToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.workspaceAddress,
	)
	workspace: WorkspaceEntity

	@Column({
		type: 'uuid',
		name: 'workspace_id',
	})
	workspaceId: string

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
	})
	complement: WorkspaceAddress['complement']

	@Column({
		type: 'varchar',
	})
	landmark: WorkspaceAddress['landmark']

	location?: WorkspaceAddress['location']

	@Column({
		type: 'varchar',
	})
	lat: WorkspaceAddress['location']['lat']

	@Column({
		type: 'varchar',
	})
	lng: WorkspaceAddress['location']['lng']

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
