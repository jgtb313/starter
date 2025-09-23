import type { Locale } from '@starter/schema'
import { typesafeI18nObject } from 'typesafe-i18n'

export type I18nDict<L extends Locale = Locale> = Record<
	L,
	Parameters<typeof typesafeI18nObject>[1]
>

export type InferI18n<T extends I18nDict> = ReturnType<
	typeof createI18n<Locale, T>
>

type I18nInstance<L extends Locale, T extends I18nDict<L>> = ReturnType<
	typeof typesafeI18nObject<L, T[L]>
>

type I18n<L extends Locale, T extends I18nDict<L>> = I18nInstance<L, T> & {
	setLocale(locale: L): void
	custom(locale: L): I18nInstance<L, T>
}

const defaultLocale: Locale = 'en'

export const createI18n = <L extends Locale, T extends I18nDict<L>>(
	dict: T,
): I18n<L, T> => {
	const locale = defaultLocale as L

	let LL: I18nInstance<L, T> = typesafeI18nObject(locale, dict[locale])

	return new Proxy<I18n<L, T>>(
		{
			setLocale(locale: L) {
				LL = typesafeI18nObject(locale, dict[locale])
			},
			custom(locale: L) {
				return typesafeI18nObject(locale, dict[locale])
			},
		} as I18n<L, T>,
		{
			get(target, prop) {
				if (prop === 'setLocale' || prop === 'custom') {
					return target[prop]
				}
				return (LL as any)[prop]
			},
		},
	)
}
