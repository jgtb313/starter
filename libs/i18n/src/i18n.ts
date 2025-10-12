import type { Locale } from '@starter/schema'

import { type LocalizedString, typesafeI18nObject } from 'typesafe-i18n'

type StripLocalized<T> = T extends LocalizedString
	? string
	: T extends (...args: infer A) => infer R
		? (...args: A) => StripLocalized<R>
		: T extends object
			? { [K in keyof T]: StripLocalized<T[K]> }
			: T

export type I18nDict<L extends Locale = Locale> = Record<
	L,
	Parameters<typeof typesafeI18nObject>[1]
>

export type InferI18n<T extends I18nDict> = ReturnType<
	typeof createI18n<Locale, T>
>

type I18nInstance<L extends Locale, T extends I18nDict<L>> = StripLocalized<
	ReturnType<typeof typesafeI18nObject<L, T[L]>>
>

type I18n<L extends Locale, T extends I18nDict<L>> = I18nInstance<L, T> & {
	setLocale(locale: L): void
	custom(locale: L): I18nInstance<L, T>
}

export const createI18n = <L extends Locale, T extends I18nDict<L>>(
	dict: T,
	initialLocale: L = 'en' as L,
): I18n<L, T> => {
	const locale = initialLocale

	let LL: I18nInstance<L, T> = typesafeI18nObject(
		locale,
		dict[locale],
	) as unknown as I18nInstance<L, T>

	return new Proxy<I18n<L, T>>(
		{
			setLocale(locale: L) {
				LL = typesafeI18nObject(
					locale,
					dict[locale],
				) as unknown as I18nInstance<L, T>
			},
			custom(locale: L) {
				return typesafeI18nObject(
					locale,
					dict[locale],
				) as unknown as I18nInstance<L, T>
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
