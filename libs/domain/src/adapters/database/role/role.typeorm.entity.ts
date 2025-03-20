import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { Role, RoleStatusEnum } from '@/schemas'

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  workspaceId: Role['workspaceId']

  @Column({ type: 'varchar' })
  name: Role['name']

  @Column({ type: 'jsonb', nullable: true })
  tags: Role['tags']

  @Column({ type: 'jsonb' })
  permissions: Role['permissions']

  @Column({ type: 'enum', enum: RoleStatusEnum })
  status: Role['status']

  @DeleteDateColumn()
  deletedAt: Role['deletedAt']

  @CreateDateColumn()
  createdAt: Role['createdAt']

  @UpdateDateColumn()
  updatedAt: Role['updatedAt']
}
