import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { User } from '@/core/user/user.schema'

type UserAddress = User['addresses'][number]

@Entity('user_addresses')
export class UserAddressEntity {
	@PrimaryGeneratedColumn('uuid')
	userAddressId: string

	@Column({
		type: 'uuid',
	})
	userId: string

	@Column({
		type: 'varchar',
	})
	title: UserAddress['title']

	@Column({
		type: 'varchar',
	})
	state: UserAddress['state']

	@Column({
		type: 'varchar',
	})
	city: UserAddress['city']

	@Column({
		type: 'varchar',
	})
	zipCode: UserAddress['zipCode']

	@Column({
		type: 'varchar',
	})
	neighborhood: UserAddress['neighborhood']

	@Column({
		type: 'varchar',
	})
	street: UserAddress['street']

	@Column({
		type: 'varchar',
	})
	number: UserAddress['number']

	@Column({
		type: 'varchar',
	})
	complement: UserAddress['complement']

	@Column({
		type: 'varchar',
	})
	landmark: UserAddress['landmark']

	@Column({
		type: 'varchar',
	})
	locationLat: UserAddress['location']['lat']

	@Column({
		type: 'varchar',
	})
	locationLng: UserAddress['location']['lng']

	@Column({
		type: 'varchar',
	})
	main: UserAddress['main']

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
