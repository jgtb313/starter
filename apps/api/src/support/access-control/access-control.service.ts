import { Injectable } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { PERMISSION_SUBJECT_ACTIONS, User, Permission, PermissionSubjects, PermissionActions } from '@starter/domain'
import { AbilityBuilder, subject as subjectFactory, Ability, MongoQuery } from '@casl/ability'
import { AnyObject } from '@casl/ability/dist/types/types'

@Injectable()
export class ACLService {
  private defineAbilities(user: User, options: { withOrganizationId: boolean }) {
    const { can, build } = new AbilityBuilder(Ability)

    const permissions = [...new Set([...user.roles.flatMap((role) => role.permissions), ...user.permissions])]

    const condition: MongoQuery<AnyObject> = {
      workspaceId: user.workspaceId,
    }

    if (options.withOrganizationId) {
      condition['organizationId'] = { $in: user.organizationIds }
    }

    permissions.forEach((permission) => {
      const [subject, action] = permission.split(':') as [PermissionSubjects, PermissionActions<PermissionSubjects>]

      if (subject === 'workspace' && action === 'manage') {
        can('manage', 'all', { workspaceId: user.workspaceId })
      } else if (action === 'manage') {
        const subjectPermissions: Permission[] = PERMISSION_SUBJECT_ACTIONS[subject]
          .filter((action) => action.key !== 'manage')
          .map((action) => `${subject}:${action.key}` as Permission)

        subjectPermissions.forEach((subjectPermission) => {
          const [subject, action] = subjectPermission.split(':')

          can(action, subject, condition)
        })
      } else {
        can(action, subject, condition)
      }
    })

    return build()
  }

  public canPerformActionByPermission(user: User, permission: Permission, resource?: { workspaceId: string; organizationId?: string }) {
    const withOrganizationId = !!resource?.organizationId

    const ability = this.defineAbilities(user, {
      withOrganizationId: !!resource?.organizationId,
    })

    const permissions: Permission[] = [permission, 'workspace:manage']

    if (withOrganizationId) {
      permissions.push('organization:manage')
    }

    const authorized = permissions.some((permission) => {
      const [subject, action] = permission.split(':')

      return resource ? ability.can(action, subjectFactory(subject, { type: subject, ...resource })) : ability.can(action, subject)
    })

    if (!authorized) {
      throw new AclForbiddenException()
    }
  }
}
