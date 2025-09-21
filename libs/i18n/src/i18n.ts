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

type LLType = typeof defaultInstance

let LL: LLType = defaultInstance

type I18nExtra = {
	create(locale: Locale): LLType
	setLocale(locale: Locale): void
	custom(locale: Locale): LLType
}

export const i18n: I18nExtra & LLType = new Proxy<I18nExtra & LLType>(
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
	} as I18nExtra & LLType,
	{
		get(target, prop) {
			if (prop === 'create' || prop === 'setLocale') {
				return target[prop]
			}

			return LL[prop as keyof typeof LL]
		},
	},
)
