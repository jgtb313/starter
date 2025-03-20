import { Injectable } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { User, Permission } from '@starter/domain'
import { AbilityBuilder, subject as subjectFactory, Ability } from '@casl/ability'

@Injectable()
export class ACLService {
  private defineAbilities(user: User) {
    const { can, build } = new AbilityBuilder(Ability)

    const permissions = [...user.roles.map((role) => role.permissions).flat(), ...user.permissions]

    permissions.forEach((permission) => {
      const [subject, action] = permission.split(':')
      can(action, subject, { workspaceId: user.workspaceId })
    })

    return build()
  }

  public canPerformActionByPermission(user: User, permission: Permission, resource?: { workspaceId: string }) {
    const ability = this.defineAbilities(user)
    const [subject, action] = permission.split(':')

    const authorized = resource ? ability.can(action, subjectFactory(subject, resource)) : ability.can(action, subject)

    if (!authorized) {
      throw new AclForbiddenException()
    }
  }

  public canPerformActionByRole(user: User, role: string) {
    if (!user.roles.some((r) => r.name === role)) {
      throw new AclForbiddenException()
    }
  }
}
