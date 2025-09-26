export type Stage = 'local' | 'dev' | 'stg' | 'prd'

export type Config = {
	name: string
	domain: string

	apiUrls: Record<Stage, string>

	logo: {
		light: string
		dark: string
		lightSymbol: string
		darkSymbol: string
	}

	theme: {
		palette: {
			primary: string
		}
	}

	contact: {
		email?: string
		phone?: string
	}

	social: {
		facebook?: string
		twitter?: string
		instagram?: string
	}

	address: string
}

export const config: Config = {
	name: 'Starter',
	domain: 'starter.com',

	apiUrls: {
		local: 'http://127.0.0.1:4000',
		dev: 'https://api.dev.starter.com',
		stg: 'https://api.stg.starter.com',
		prd: 'https://api.starter.com',
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
