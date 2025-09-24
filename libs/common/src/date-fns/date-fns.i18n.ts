import type { Locale } from '@starter/schema'
import type { Locale as DateFnsLocale } from 'date-fns/locale'
import { enUS } from 'date-fns/locale/en-US'
import { es } from 'date-fns/locale/es'
import { ptBR } from 'date-fns/locale/pt-BR'

export const dateFnsLocales: Record<Locale, DateFnsLocale> = {
	en: enUS,
	es: es,
	'pt-BR': ptBR,
}

export const dateFnsTimezones: Record<Locale, string> = {
	en: 'America/New_York',
	es: 'America/Mexico_City',
	'pt-BR': 'America/Sao_Paulo',
}

export const dateFnsFormat: Record<Locale, string> = {
	en: 'dd/MM/yyyy',
	es: 'dd/MM/yyyy',
	'pt-BR': 'dd/MM/yyyy',
}
