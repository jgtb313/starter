import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'
import { deepPick, deepOmit } from '@starter/common'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>()

    const { fields } = request.query

    if (!fields) {
      return next.handle().pipe(map((data) => deepOmit(data, 'password')))
    }

    const parsedFields = fields.toString().replace(/\s+/g, '')

    const formatResponse = <T extends {}>(value: T) => deepPick(parsedFields, deepOmit(value, ['password']))

    return next.handle().pipe(
      map((data) => {
        if (data.values) {
          return {
            ...data,
            values: data.values.map(formatResponse),
          }
        }

        return formatResponse(data)
      }),
    )
  }
}
