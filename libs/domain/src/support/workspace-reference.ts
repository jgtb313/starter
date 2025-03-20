import { isString } from '@starter/common'

export type WithWorkspaceReference<T extends string> = string | ({ [key in T]: string } & { workspaceId?: string })

export const createWorkspaceReference =
  <T extends string>(key: T) =>
  (reference: WithWorkspaceReference<T>) =>
    isString(reference) ? { [key]: reference } : reference
