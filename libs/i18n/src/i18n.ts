import type { Locale } from '@starter/schema'
import { typesafeI18nObject } from 'typesafe-i18n'

import { translationsEn } from './locales/en.i18n'
import { translationsEs } from './locales/es.i18n'
import { translationsPtBR } from './locales/pt-BR.i18n'

function getTranslations(locale: Locale) {
	const locales = {
		en: translationsEn,
		es: translationsEs,
		'pt-BR': translationsPtBR,
	}

	return locales[locale]
}

const defaultInstance = typesafeI18nObject('en', translationsEn)

type I18nInstance = typeof defaultInstance

let LL: I18nInstance = defaultInstance

type I18nOptions = {
	create(locale: Locale): I18nInstance
	setLocale(locale: Locale): void
	custom(locale: Locale): I18nInstance
}

type I18n = I18nInstance & I18nOptions

export const i18n: I18n = new Proxy<I18n>(
	{
		create(locale: Locale) {
			const dict = getTranslations(locale)

			return typesafeI18nObject(locale, dict)
		},

		setLocale(locale: Locale) {
			const dict = getTranslations(locale)

			LL = typesafeI18nObject(locale, dict)
		},

		custom(locale: Locale) {
			return typesafeI18nObject(locale, getTranslations(locale))
		},
	} as I18n,
	{
		get(target, prop) {
			if (prop === 'create' || prop === 'setLocale') {
				return target[prop]
			}

			return LL[prop as keyof typeof LL]
		},
	},
)

i18n.setLocale('pt-BR')

i18n.hello({
	name: 'John',
	variavel: 'variavel',
})

i18n.custom('en').hello({
	name: 'John',
	variavel: 'variavel',
})
