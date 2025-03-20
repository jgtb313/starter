export enum StageEnum {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd',
}

export const config = {
  name: 'Starter',
  domain: 'starter.com',

  apiUrls: {
    [StageEnum.LOCAL]: 'http://127.0.0.1:4000',
    [StageEnum.DEV]: 'https://api.dev.starter.com',
    [StageEnum.STG]: 'https://api.stg.starter.com',
    [StageEnum.PRD]: 'https://api.starter.com',
  },

  logo: {
    light: 'https://i.imgur.com/ZZj6MJe.png',
    dark: 'https://i.imgur.com/XiQWcgF.png',
    lightSymbol: 'https://i.imgur.com/PKkfhDW.png',
    darkSymbol: 'https://i.imgur.com/G9hwluS.png',
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
