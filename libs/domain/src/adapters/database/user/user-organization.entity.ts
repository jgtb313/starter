import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { UserEntity } from './user.typeorm.entity'

import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'

@Entity('user_organizations')
export class UserOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	userOrganizationId: string

	@Column({
		type: 'uuid',
	})
	userId: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

	@ManyToOne(() => OrganizationEntity)
	@JoinColumn({
		name: 'organizationId',
	})
	organization: OrganizationEntity

	@Column({
		type: 'uuid',
	})
	organizationId: string

	@ManyToOne(() => RoleEntity)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@Column({
		type: 'uuid',
	})
	roleId: string

	@Column({
		type: 'uuid',
	})
	workspaceId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
