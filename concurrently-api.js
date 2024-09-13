const concurrently = require('concurrently')

concurrently(
  [
    {
      command: 'yarn backend:dev',
      name: 'Backend',
      prefixColor: '#656A7E'
    },
    {
      command: 'yarn schema:dev',
      name: 'Schema',
      prefixColor: '#7B2EDA'
    },
    {
      command: 'yarn shared:dev',
      name: 'Shared',
      prefixColor: '#C91A25'
    }
  ],
  {
    prefix: '{time} [{name}]',
    timestampFormat: 'HH:mm:ss'
  }
)
