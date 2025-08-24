import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import {
	type Workspace,
	WorkspaceStatusEnum,
} from '@/core/workspace/workspace.schema'

@Entity('workspaces')
export class WorkspaceEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceId: Workspace['workspaceId']

	@Column({
		type: 'varchar',
	})
	name: Workspace['name']

	@Column({
		type: 'json',
		nullable: true,
	})
	integrations?: Workspace['integrations']

	@Column({
		type: 'varchar',
	})
	status: Workspace['status']

	@CreateDateColumn({})
	createdAt: Workspace['createdAt']

	@UpdateDateColumn({})
	updatedAt: Workspace['updatedAt']
}
