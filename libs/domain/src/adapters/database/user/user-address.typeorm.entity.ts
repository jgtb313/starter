import {
	AfterLoad,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { User } from '@/core/user/user.schema'
import type { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

type UserAddress = User['addresses'][number]

@Entity('user_address')
export class UserAddressEntity {
	@PrimaryGeneratedColumn('uuid')
	userAddressId: string

	@ManyToOne('UserEntity', (user: UserEntity) => user.userAddresses)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

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
		nullable: true,
	})
	complement: UserAddress['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	landmark: UserAddress['landmark']

	location: UserAddress['location']

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

	@Column({
		type: 'boolean',
		default: false,
	})
	main: boolean

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
