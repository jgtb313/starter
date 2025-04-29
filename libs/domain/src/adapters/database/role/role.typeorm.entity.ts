import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { Role, RoleStatusEnum } from '@/core/role/role.schema'

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  workspaceId: Role['workspaceId']

  @Column({ type: 'uuid', array: true, default: [] })
  organizationIds: Role['organizationIds']

  @Column({ type: 'varchar' })
  name: Role['name']

  @Column({ type: 'jsonb', nullable: true })
  tags: Role['tags']

  @Column({ type: 'jsonb' })
  permissions: Role['permissions']

  @Column({ type: 'enum', enum: RoleStatusEnum })
  status: Role['status']

  @DeleteDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date | null) => (value ? value.toISOString() : null),
    },
  })
  deletedAt: Role['deletedAt']

  @CreateDateColumn({
    transformer: {
      to: (value: Date | null) => value,
      from: (value: Date | null) => (value ? value.toISOString() : null),
    },
  })
  createdAt: Role['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date | null) => value,
      from: (value: Date | null) => (value ? value.toISOString() : null),
    },
  })
  updatedAt: Role['updatedAt']
}
