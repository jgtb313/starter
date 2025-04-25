import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User, UserStatusEnum } from '@/core/user/user.schema'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: User['userId']

  @Column({ type: 'uuid', nullable: true })
  workspaceId: User['workspaceId']

  @Column({ type: 'uuid', array: true, default: [] })
  organizationIds: User['organizationIds']

  @Column({ type: 'uuid', array: true, default: [] })
  roleIds: User['roleIds']

  @Column({ type: 'jsonb', default: [] })
  permissions: User['permissions']

  @Column({ type: 'varchar' })
  name: User['name']

  @Column({ type: 'varchar' })
  email: User['email']

  @Column({ type: 'jsonb', nullable: true })
  phone: User['phone']

  @Column({ type: 'varchar', nullable: true })
  avatar: User['avatar']

  @Column({ type: 'jsonb', nullable: true })
  social: User['social']

  @Column({ type: 'varchar' })
  password: User['password']

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
  status: User['status']

  @CreateDateColumn()
  createdAt: User['createdAt']

  @UpdateDateColumn()
  updatedAt: User['updatedAt']
}
