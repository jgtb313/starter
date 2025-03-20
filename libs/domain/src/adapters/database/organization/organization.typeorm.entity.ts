import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Organization, OrganizationStatusEnum } from '@/schemas'

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  organizationId: Organization['organizationId']

  @Column({ type: 'uuid' })
  workspaceId: Organization['workspaceId']

  @Column({ type: 'varchar' })
  name: Organization['name']

  @Column({ type: 'enum', enum: OrganizationStatusEnum, default: OrganizationStatusEnum.ACTIVE })
  status: Organization['status']

  @CreateDateColumn()
  createdAt: Organization['createdAt']

  @UpdateDateColumn()
  updatedAt: Organization['updatedAt']
}
