import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'

import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { Role } from '@/core/role/role.schema'

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  workspaceId: Role['workspaceId']

  @OneToMany(() => RoleOrganizationEntity, (roleOrganization) => roleOrganization.role)
  organizations: RoleOrganizationEntity[]

  @OneToMany(() => RolePermissionEntity, (rolePermission) => rolePermission.role)
  permissions: RolePermissionEntity[]

  @Column({ type: 'varchar' })
  name: Role['name']

  @Column({ type: 'simple-array', nullable: true })
  tags: Role['tags']

  @Column({ type: 'varchar' })
  status: Role['status']

  @DeleteDateColumn()
  deletedAt: Role['deletedAt']

  @CreateDateColumn()
  createdAt: Role['createdAt']

  @UpdateDateColumn()
  updatedAt: Role['updatedAt']
}
