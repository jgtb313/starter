import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException } from '@starter/nestjs-error-handling'

import { PermissionService } from '@/core/permission/permission.service'
import { PermissionRepositoryModule } from '@/adapters/database/permission/permission.repository.module'
import { InMemoryDatabaseModule, loadDatabase } from '@/adapters/database'
import { IPermissionRepository } from '@/ports/database/permission'
import { permissionMocks } from '@/core/permission/permission.mock'

describe('PermissionService', () => {
  let service: PermissionService
  let repository: IPermissionRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDatabaseModule.register(), PermissionRepositoryModule],
      providers: [PermissionService],
    }).compile()

    service = module.get(PermissionService)
    repository = module.get<IPermissionRepository>('PERMISSION_REPOSITORY')

    await loadDatabase(module)

    vi.clearAllMocks()
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getPermissions', () => {
    it('should return permissions correctly', async () => {
      const result = await service.getPermissions()

      expect(result).toHaveLength(permissionMocks.length)
    })
  })

  describe('validatePermissionIds', () => {
    it('should resolve when all permissionIds are valid', async () => {
      const permission = permissionMocks[0]

      await expect(service.validatePermissionIds([permission.state.permissionId])).resolves.toBeUndefined()
    })

    it('should throw NotFoundException when some permissionIds are not valid', async () => {
      await expect(service.validatePermissionIds(['invalid-permission-id'])).rejects.toThrow(NotFoundException)
    })
  })
})
