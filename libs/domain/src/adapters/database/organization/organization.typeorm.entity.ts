import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Organization } from '@/core/organization/organization.schema'

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  organizationId: Organization['organizationId']

  @Column({ type: 'uuid' })
  workspaceId: Organization['workspaceId']

  @Column({ type: 'varchar' })
  name: Organization['name']

  @Column({ type: 'varchar' })
  status: Organization['status']

  @DeleteDateColumn({})
  deletedAt: Organization['deletedAt']

  @CreateDateColumn({})
  createdAt: Organization['createdAt']

  @UpdateDateColumn({})
  updatedAt: Organization['updatedAt']
}
