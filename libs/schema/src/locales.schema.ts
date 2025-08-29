import type { z } from 'zod'

const parsedType = (data: unknown): string => {
	const t = typeof data

	if (t === 'number') {
		return Number.isNaN(data) ? 'NaN' : 'number'
	}

	if (t === 'object') {
		if (Array.isArray(data)) {
			return 'array'
		}

		if (data === null) {
			return 'null'
		}

		if (!data) {
			return 'undefined'
		}

		if (data.constructor && Object.getPrototypeOf(data) !== Object.prototype) {
			return data.constructor.name
		}
	}

	return t
}

const stringifyPrimitive = (value: unknown) =>
	typeof value === 'string' ? `"${value}"` : String(value)

const joinValues = (values: unknown[], sep: string) =>
	values.map((v) => stringifyPrimitive(v)).join(sep)

export const en: z.core.$ZodErrorMap = (issue) => {
	const Sizable: Record<
		string,
		{
			unit: string
		}
	> = {
		string: {
			unit: 'characters',
		},
		array: {
			unit: 'items',
		},
		set: {
			unit: 'items',
		},
	}

	const Nouns: Record<string, string> = {
		regex: 'input',
		email: 'email address',
		url: 'URL',
		uuid: 'UUID',
		datetime: 'ISO datetime',
		date: 'ISO date',
		time: 'ISO time',
	}

	switch (issue.code) {
		case 'invalid_type':
			return `Invalid input: expected ${issue.expected}, received ${parsedType(issue.input)}`
		case 'invalid_value':
			if (issue.values && issue.values.length === 1) {
				return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`
			}
			if (issue.values) {
				return `Invalid option: expected one of ${joinValues(issue.values, ' | ')}`
			}
			return 'Invalid input'
		case 'too_big': {
			const adj = issue.inclusive ? '<=' : '<'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Too big: expected ${issue.origin} to have ${adj}${issue.maximum} ${sizing.unit}`
			}
			return `Too big: expected ${issue.origin ?? 'value'} to be ${adj}${issue.maximum}`
		}
		case 'too_small': {
			const adj = issue.inclusive ? '>=' : '>'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum} ${sizing.unit}`
			}
			return `Too small: expected ${issue.origin ?? 'value'} to be ${adj}${issue.minimum}`
		}
		case 'invalid_format': {
			if (issue.format === 'starts_with') {
				return `Invalid string: must start with "${issue.prefix}"`
			}
			if (issue.format === 'ends_with') {
				return `Invalid string: must end with "${issue.suffix}"`
			}
			if (issue.format === 'includes') {
				return `Invalid string: must include "${issue.includes}"`
			}
			if (issue.format === 'regex') {
				return `Invalid string: must match pattern ${issue.pattern}`
			}
			return `Invalid ${issue.format ? (Nouns[issue.format] ?? issue.format) : 'input'}`
		}
		case 'not_multiple_of':
			return `Invalid number: must be a multiple of ${issue.divisor}`
		case 'unrecognized_keys':
			return `Unrecognized key${issue.keys && issue.keys.length > 1 ? 's' : ''}: ${issue.keys?.join(', ')}`
		case 'invalid_key':
			return `Invalid key in ${issue.origin}`
		case 'invalid_union':
			return 'Invalid input'
		case 'invalid_element':
			return `Invalid value in ${issue.origin}`
		default:
			return 'Invalid input'
	}
}

export const es: z.core.$ZodErrorMap = (issue) => {
	const Sizable: Record<
		string,
		{
			unit: string
		}
	> = {
		string: {
			unit: 'caracteres',
		},
		array: {
			unit: 'elementos',
		},
		set: {
			unit: 'elementos',
		},
	}

	const Nouns: Record<string, string> = {
		regex: 'entrada',
		email: 'dirección de correo electrónico',
		url: 'URL',
		uuid: 'UUID',
		datetime: 'fecha ISO',
		date: 'fecha ISO',
		time: 'hora ISO',
	}

	switch (issue.code) {
		case 'invalid_type':
			return `Entrada inválida: se esperaba ${issue.expected}, recibido ${parsedType(issue.input)}`
		case 'invalid_value':
			if (issue.values && issue.values.length === 1) {
				return `Entrada inválida: se esperaba ${stringifyPrimitive(issue.values[0])}`
			}
			if (issue.values) {
				return `Opción inválida: se esperaba una de ${joinValues(issue.values, ' | ')}`
			}
			return 'Entrada inválida'
		case 'too_big': {
			const adj = issue.inclusive ? '<=' : '<'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Demasiado grande: se esperaba que ${issue.origin} tuviera ${adj}${issue.maximum} ${sizing.unit}`
			}
			return `Demasiado grande: se esperaba que ${issue.origin ?? 'valor'} fuera ${adj}${issue.maximum}`
		}
		case 'too_small': {
			const adj = issue.inclusive ? '>=' : '>'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Demasiado pequeño: se esperaba que ${issue.origin} tuviera ${adj}${issue.minimum} ${sizing.unit}`
			}
			return `Demasiado pequeño: se esperaba que ${issue.origin ?? 'valor'} fuera ${adj}${issue.minimum}`
		}
		case 'invalid_format': {
			if (issue.format === 'starts_with') {
				return `Cadena inválida: debe comenzar con "${issue.prefix}"`
			}
			if (issue.format === 'ends_with') {
				return `Cadena inválida: debe terminar con "${issue.suffix}"`
			}
			if (issue.format === 'includes') {
				return `Cadena inválida: debe incluir "${issue.includes}"`
			}
			if (issue.format === 'regex') {
				return `Cadena inválida: debe coincidir con el patrón ${issue.pattern}`
			}
			return `Inválido ${issue.format ? (Nouns[issue.format] ?? issue.format) : 'entrada'}`
		}
		case 'not_multiple_of':
			return `Número inválido: debe ser múltiplo de ${issue.divisor}`
		case 'unrecognized_keys':
			return `Clave${issue.keys && issue.keys.length > 1 ? 's' : ''} no reconocida${issue.keys ? `: ${issue.keys.join(', ')}` : ''}`
		case 'invalid_key':
			return `Clave inválida en ${issue.origin}`
		case 'invalid_union':
			return 'Entrada inválida'
		case 'invalid_element':
			return `Valor inválido en ${issue.origin}`
		default:
			return 'Entrada inválida'
	}
}

export const ptBR: z.core.$ZodErrorMap = (issue) => {
	const Sizable: Record<
		string,
		{
			unit: string
		}
	> = {
		string: {
			unit: 'caracteres',
		},
		array: {
			unit: 'itens',
		},
		set: {
			unit: 'itens',
		},
	}

	const Nouns: Record<string, string> = {
		regex: 'entrada',
		email: 'endereço de email',
		url: 'URL',
		uuid: 'UUID',
		datetime: 'data ISO',
		date: 'data ISO',
		time: 'hora ISO',
	}

	switch (issue.code) {
		case 'invalid_type':
			return `Entrada inválida: esperado ${issue.expected}, recebido ${parsedType(issue.input)}`
		case 'invalid_value':
			if (issue.values && issue.values.length === 1) {
				return `Entrada inválida: esperado ${stringifyPrimitive(issue.values[0])}`
			}
			if (issue.values) {
				return `Opção inválida: esperado um dos seguintes valores ${joinValues(issue.values, ' | ')}`
			}
			return 'Entrada inválida'
		case 'too_big': {
			const adj = issue.inclusive ? '<=' : '<'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Muito grande: esperado que ${issue.origin} tenha ${adj}${issue.maximum} ${sizing.unit}`
			}
			return `Muito grande: esperado que ${issue.origin ?? 'valor'} seja ${adj}${issue.maximum}`
		}
		case 'too_small': {
			const adj = issue.inclusive ? '>=' : '>'
			const sizing = issue.origin ? Sizable[issue.origin] : null
			if (sizing) {
				return `Muito pequeno: esperado que ${issue.origin} tenha ${adj}${issue.minimum} ${sizing.unit}`
			}
			return `Muito pequeno: esperado que ${issue.origin ?? 'valor'} seja ${adj}${issue.minimum}`
		}
		case 'invalid_format': {
			if (issue.format === 'starts_with') {
				return `String inválida: deve começar com "${issue.prefix}"`
			}
			if (issue.format === 'ends_with') {
				return `String inválida: deve terminar com "${issue.suffix}"`
			}
			if (issue.format === 'includes') {
				return `String inválida: deve incluir "${issue.includes}"`
			}
			if (issue.format === 'regex') {
				return `String inválida: deve corresponder ao padrão ${issue.pattern}`
			}
			return `Inválido ${issue.format ? (Nouns[issue.format] ?? issue.format) : 'entrada'}`
		}
		case 'not_multiple_of':
			return `Número inválido: deve ser múltiplo de ${issue.divisor}`
		case 'unrecognized_keys':
			return `Chave${issue.keys && issue.keys.length > 1 ? 's' : ''} não reconhecida${issue.keys ? `: ${issue.keys.join(', ')}` : ''}`
		case 'invalid_key':
			return `Chave inválida em ${issue.origin}`
		case 'invalid_union':
			return 'Entrada inválida'
		case 'invalid_element':
			return `Valor inválido em ${issue.origin}`
		default:
			return 'Entrada inválida'
	}
}
