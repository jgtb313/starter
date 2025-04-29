import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Organization, OrganizationStatusEnum } from '@/core/organization/organization.schema'

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

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: Organization['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  updatedAt: Organization['updatedAt']
}
