import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import { Role } from '@/core/role/role.schema'
import { Permission } from '@/core/permission/permission.schema'

@Entity('role_permissions')
export class RolePermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  rolePermissionId: string

  @Column({ type: 'uuid' })
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  permissionId: Permission['permissionId']

  @DeleteDateColumn({})
  deletedAt?: Date

  @CreateDateColumn({})
  createdAt: Date

  @UpdateDateColumn({})
  updatedAt: Date
}
