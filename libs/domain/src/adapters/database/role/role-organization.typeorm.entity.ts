import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import { Role } from '@/core/role/role.schema'
import { Organization } from '@/core/organization/organization.schema'

@Entity('role_organizations')
export class RoleOrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  roleOrganizationId: string

  @Column({ type: 'uuid' })
  roleId: Role['roleId']

  @Column({ type: 'uuid' })
  organizationId: Organization['organizationId']

  @DeleteDateColumn({})
  deletedAt?: Date

  @CreateDateColumn({})
  createdAt: Date

  @UpdateDateColumn({})
  updatedAt: Date
}
