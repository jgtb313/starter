import { StageEnum } from './config.support'

const createRedirectUrls = ({ local, dev, stg, prd }: Record<StageEnum, string>): Record<StageEnum, string> => ({
  local,
  dev,
  stg,
  prd,
})

const appRedirectUrls = createRedirectUrls({
  local: 'http://localhost:3001',
  dev: 'http://localhost:3001',
  stg: 'http://localhost:3001',
  prd: 'http://localhost:3001',
})

const consoleRedirectUris = createRedirectUrls({
  local: 'http://localhost:3002',
  dev: 'http://localhost:3002',
  stg: 'http://localhost:3002',
  prd: 'http://localhost:3002',
})

export const config = {
  name: 'Starter',
  domain: 'starter.com',

  oauth: {
    fallbackUrl: 'https://google.com',

    clientIds: {
      app: {
        clientId: 'app',
        redirectUrls: appRedirectUrls,
      },

      console: {
        clientId: 'console',
        redirectUrls: consoleRedirectUris,
      },
    },
  },

  logo: {
    light: 'https://nodejs.org/static/logos/nodejsDark.svg',
    dark: 'https://nodejs.org/static/logos/nodejsLight.svg',
    lightSymbol: 'https://nodejs.org/static/logos/jsIconGreen.svg',
    darkSymbol: 'https://nodejs.org/static/logos/jsIconWhite.svg',
  },

  theme: {
    palette: {
      primary: '#3498db',
    },
  },

  contact: {
    email: 'support@starter.com',
    phone: '98991143200',
  },

  social: {
    facebook: 'https://facebook.com/starter',
    twitter: 'https://x.com/starter',
    instagram: 'https://instagram.com/starter',
  },
}
