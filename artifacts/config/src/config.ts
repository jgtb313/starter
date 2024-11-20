import { StageEnum } from './config.support'

const createRedirectUrls = ({ local, dev, stg, prd }: Record<StageEnum, string>): Record<StageEnum, string> => ({
  local,
  dev,
  stg,
  prd,
})

const appRedirectUrls = createRedirectUrls({
  local: 'https://localhost:3001',
  dev: 'https://localhost:3001',
  stg: 'https://localhost:3001',
  prd: 'https://localhost:3001',
})

const consoleRedirectUris = createRedirectUrls({
  local: 'https://localhost:3002',
  dev: 'https://localhost:3002',
  stg: 'https://localhost:3002',
  prd: 'https://localhost:3002',
})

export const config = {
  name: 'Starter',
  domain: 'starter.com',

  oauth: {
    fallbackUrl: '',

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
