import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import { Role } from '@/core/role/role.schema'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
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

  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity

  @ManyToOne(() => PermissionEntity, (permission) => permission.permissionId)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity
}
