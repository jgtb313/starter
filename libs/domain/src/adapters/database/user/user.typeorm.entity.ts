import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User, UserStatusEnum } from '@/core/user/user.schema'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: User['userId']

  @Column({ type: 'uuid', nullable: true })
  workspaceId: User['workspaceId']

  @Column({ type: 'simple-array' })
  scopes: User['scopes']

  @Column({ type: 'json' })
  permissions: User['permissions']

  @Column({ type: 'varchar' })
  name: User['name']

  @Column({ type: 'varchar' })
  email: User['email']

  @Column({ type: 'json', nullable: true })
  phone: User['phone']

  @Column({ type: 'varchar', nullable: true })
  avatar: User['avatar']

  @Column({ type: 'json', nullable: true })
  social: User['social']

  @Column({ type: 'varchar' })
  password: User['password']

  @Column({ type: 'varchar' })
  status: User['status']

  @CreateDateColumn({})
  createdAt: User['createdAt']

  @UpdateDateColumn({})
  updatedAt: User['updatedAt']
}
