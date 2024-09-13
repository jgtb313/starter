const concurrently = require('concurrently')

concurrently(
  [
    {
      command: 'sleep 5 && yarn server',
      name: 'Server',
      prefixColor: '#E97777'
    }
  ],
  {
    prefix: '{time} [{name}]',
    timestampFormat: 'HH:mm:ss'
  }
)
