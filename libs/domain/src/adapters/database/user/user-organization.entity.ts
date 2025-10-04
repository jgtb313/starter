import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('user_organizations')
export class UserOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	userOrganizationId: string

	@Column({
		type: 'uuid',
	})
	workspaceId: string

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

	@CreateDateColumn({})
	createdAt: Date

	@UpdateDateColumn({})
	updatedAt: Date
}
