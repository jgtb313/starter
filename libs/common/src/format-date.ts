import { enUS } from 'date-fns/locale/en-US'
import { es } from 'date-fns/locale/es'
import { ptBR } from 'date-fns/locale/pt-BR'
import { format } from 'date-fns-tz'

import { getDate } from './get-date'
import { state } from './locales.common'

const locales = {
	en: enUS,
	'pt-BR': ptBR,
	es: es,
}

const timezones = {
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
