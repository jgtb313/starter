import type { Locale } from '@starter/schema'
import type { Locale as DateFnsLocale } from 'date-fns/locale'
import { enUS } from 'date-fns/locale/en-US'
import { es } from 'date-fns/locale/es'
import { ptBR } from 'date-fns/locale/pt-BR'
import { format } from 'date-fns-tz'

import { state } from './@state/common.state'
import { getDate } from './get-date'

const locales: Record<Locale, DateFnsLocale> = {
	en: enUS,
	'pt-BR': ptBR,
	es: es,
}

const timezones: Record<Locale, string> = {
	en: 'America/New_York',
	'pt-BR': 'America/Sao_Paulo',
	es: 'America/Mexico_City',
}

export const formatDate = (value: Date | string, f = 'dd/MM/yyyy') => {
	const t = timezones[state.locale]
	const l = locales[state.locale]

	return format(getDate(value), f, {
		timeZone: t,
		locale: l,
	})
}
