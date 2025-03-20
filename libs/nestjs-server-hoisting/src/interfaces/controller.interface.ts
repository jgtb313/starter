import { ZodSchema } from '@starter/schema'

export interface ControllerOptions {
  name: string
  description: string

  basePath: string

  schemas: Record<string, { schema: ZodSchema; description?: string }>
}
