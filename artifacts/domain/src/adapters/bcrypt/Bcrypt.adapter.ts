import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { IEncrypt } from '../../ports/encrypt'

const salt = genSaltSync(10)

export const Encrypt = ({}: CreateDependenciesOptions): IEncrypt => ({
  hash(value) {
    return hashSync(value, salt)
  },

  compare(value, hash) {
    return compareSync(value, hash)
  },
})
