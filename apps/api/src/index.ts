import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

import './module-alias'
import './app'
