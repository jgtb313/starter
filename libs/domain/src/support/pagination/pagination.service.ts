import { Injectable } from '@nestjs/common'
import { Repository, ObjectLiteral, FindOptionsWhere } from 'typeorm'
import { PaginationSchema, Pagination, PaginationOutput } from '@starter/schema'

@Injectable()
export class PaginationService {
  async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    {
      where,
      ...pagination
    }: Pagination<{
      where?: FindOptionsWhere<T> | FindOptionsWhere<T>[]
      offset?: number
      limit?: number
    }>,
  ): Promise<PaginationOutput<T>> {
    const { offset = 0, limit = 10 } = PaginationSchema.parse(pagination)

    const skip = offset
    const take = limit

    const [values, total] = await repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values,
      meta: { total, offset, limit },
    }
  }
}
