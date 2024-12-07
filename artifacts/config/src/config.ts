import { StageEnum } from './config.support'

const createRedirectUrls = ({ local, dev, stg, prd }: Record<StageEnum, string>): Record<StageEnum, string> => ({
  local,
  dev,
  stg,
  prd,
})

export const authRedirectUrls = createRedirectUrls({
  local: 'http://localhost:3000',
  dev: 'http://localhost:3000',
  stg: 'http://localhost:3000',
  prd: 'http://localhost:3000',
})

export const config = {
  name: 'Starter',
  domain: 'starter.com',

  oauth: {
    fallbackUrl: 'https://google.com',

    clientIds: {
      app: {
        clientId: 'app',
        redirectUrls: createRedirectUrls({
          local: 'http://localhost:3001',
          dev: 'http://localhost:3001',
          stg: 'http://localhost:3001',
          prd: 'http://localhost:3001',
        }),
      },

      console: {
        clientId: 'console',
        redirectUrls: createRedirectUrls({
          local: 'http://localhost:3002',
          dev: 'http://localhost:3002',
          stg: 'http://localhost:3002',
          prd: 'http://localhost:3002',
        }),
      },
    },
  },

  logo: {
    light: {
      png: 'https://i.imgur.com/ZZj6MJe.png',
      svg: 'https://nodejs.org/static/logos/nodejsDark.svg',
    },
    dark: {
      png: 'https://i.imgur.com/XiQWcgF.png',
      svg: 'https://nodejs.org/static/logos/nodejsLight.svg',
    },
    lightSymbol: {
      png: 'https://i.imgur.com/PKkfhDW.png',
      svg: 'https://nodejs.org/static/logos/jsIconGreen.svg',
    },
    darkSymbol: {
      png: 'https://i.imgur.com/G9hwluS.png',
      svg: 'https://nodejs.org/static/logos/jsIconWhite.svg',
    },
  },

  theme: {
    palette: {
      primary: '#0969ff',
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

  address: '350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA',
}
