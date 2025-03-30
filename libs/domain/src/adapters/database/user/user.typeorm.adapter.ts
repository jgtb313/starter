import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { UserEntity } from './user.typeorm.entity'

@Injectable()
export class UserRepository extends Repository<UserEntity> {}
