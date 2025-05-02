import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { PaginationSchemaTransform } from '@starter/schema'

declare module 'express' {
  interface Request {
    pagination?: {
      limit: number
      offset: number
    }
  }
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()

    try {
      const pagination = PaginationSchemaTransform.parse(request.query)

      request.pagination = pagination
    } catch (error) {}

    return next.handle()
  }
}
