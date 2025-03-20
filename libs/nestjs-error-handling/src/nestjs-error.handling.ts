import { ForbiddenException } from '@nestjs/common'

export {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  PayloadTooLargeException,
  PreconditionFailedException,
  RequestTimeoutException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common'

export class AclForbiddenException extends ForbiddenException {
  constructor(message: string = 'You are not authorized to perform this action') {
    super(message)
  }
}
