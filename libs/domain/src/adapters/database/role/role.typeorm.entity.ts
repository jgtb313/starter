import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { Role } from '@/core/role/role.schema'

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  workspaceId: Role['workspaceId']

  @Column({ type: 'varchar' })
  name: Role['name']

  @Column({ type: 'simple-array', nullable: true })
  tags: Role['tags']

  @Column({ type: 'varchar' })
  status: Role['status']

  @DeleteDateColumn({})
  deletedAt: Role['deletedAt']

  @CreateDateColumn({})
  createdAt: Role['createdAt']

  @UpdateDateColumn({})
  updatedAt: Role['updatedAt']
}
