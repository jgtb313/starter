import { z } from '@starter/schema'

export class BaseDomain<T> {
  state!: T

  constructor(schema: z.ZodType, data: T) {
    const state = schema.parse(data)

    Object.assign(this, {
      state,
    })
  }

  toJSON() {
    return this.state
  }
}
