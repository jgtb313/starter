const fs = require('fs')

console.log('Oi')

fs.copyFileSync('../../.env', '.env')
