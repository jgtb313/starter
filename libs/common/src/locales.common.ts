import type { Locale } from '@starter/schema'

type State = {
	locale: Locale
}

export const state: State = {
	locale: 'en',
}

export const setupLocale = (locale: Locale) => {
	state.locale = locale
}
