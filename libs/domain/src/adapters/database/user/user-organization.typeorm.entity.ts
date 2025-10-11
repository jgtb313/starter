import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('user_organizations')
export class UserOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	userOrganizationId: string

	@ManyToOne(() => UserEntity)
	user: UserEntity

	@ManyToOne(() => OrganizationEntity)
	organization: OrganizationEntity

	@ManyToOne(() => RoleEntity)
	role: RoleEntity

	@Column({
		type: 'uuid',
	})
	userId: string

	@Column({
		type: 'uuid',
	})
	organizationId: string

	@Column({
		type: 'uuid',
	})
	roleId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
