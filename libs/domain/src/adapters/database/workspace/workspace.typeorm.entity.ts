import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Workspace, WorkspaceStatusEnum } from '@/core/workspace/workspace.schema'

@Entity('workspaces')
export class WorkspaceEntity {
  @PrimaryGeneratedColumn('uuid')
  workspaceId: Workspace['workspaceId']

  @Column({ type: 'varchar' })
  name: Workspace['name']

  @Column({ type: 'json', nullable: true })
  integrations?: Workspace['integrations']

  @Column({ type: 'enum', enum: WorkspaceStatusEnum, default: WorkspaceStatusEnum.ACTIVE })
  status: Workspace['status']

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: Workspace['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  updatedAt: Workspace['updatedAt']
}
