import { WorkspaceSchema, Workspace as IWorkspace } from '@starter/schema'
import { slugify } from '@starter/shared'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type WorkspaceDomain = SetupDomain<IWorkspace, 'name' | 'domain'>

const generateRandomName = () => {
  const adjectives = ['Blue', 'Green', 'Fast', 'Smart', 'Bright', 'Creative', 'Dynamic', 'Innovative']
  const nouns = ['Sky', 'Ocean', 'Mountain', 'River', 'Forest', 'Tech', 'Solutions', 'Works']
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adjective} ${noun}`
}

const generateRandomNumberString = () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')

export class Workspace {
  state!: IWorkspace

  constructor(workspace: WorkspaceDomain) {
    const customName = generateRandomName()

    Object.assign(this, {
      state: setupDomain(
        {
          name: customName,
          domain: `${slugify(customName)}-${generateRandomNumberString}`,
          ...workspace
        },
        WorkspaceSchema
      )
    })
  }
}
