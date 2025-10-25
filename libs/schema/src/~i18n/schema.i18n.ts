const en = {
	passwordMinLength: 'Password must be at least 8 characters long',
	passwordMaxLength: 'Password must be at most 64 characters long',
	passwordMinLowercase: 'Password must contain at least one lowercase letter',
	passwordMinUppercase: 'Password must contain at least one uppercase letter',
	passwordMinNumbers: 'Password must contain at least one number',
	passwordMinSymbols: 'Password must contain at least one symbol',
	paymentCardInvalidCvv: 'Invalid CVV',
	paymentCardInvalidExpirationDate: 'Invalid expiration date',
	paymentCardInvalidNumber: 'Invalid card number',
	dateInvalid: 'Invalid date',
	birthdayInvalidRange: 'Birthday must be after January 1, 1900',
	phoneInvalid: 'Invalid phone number',
	documentInvalid: 'Invalid document',
	documentTypeMismatch: 'Document type does not match the number',
	documentInvalidCnpj: 'Invalid CNPJ',
	documentInvalidCpf: 'Invalid CPF',
	sortInvalidFormat:
		'Invalid sort format (expected "field:asc" or "field:desc")',
	sortInvalidField: 'Invalid sort field, expected one of: {expected:string}',
	sortInvalidOrder: 'Invalid sort order, expected one of: {expected:string}',
	translationsInvalidLocale: `Invalid locale must be one of en, es, pt-BR`,
} as const

type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
	passwordMaxLength: 'La contraseña debe tener a lo sumo 64 caracteres',
	passwordMinLowercase:
		'La contraseña debe contener al menos una letra minúscula',
	passwordMinUppercase:
		'La contraseña debe contener al menos una letra mayúscula',
	passwordMinNumbers: 'La contraseña debe contener al menos un número',
	passwordMinSymbols: 'La contraseña debe contener al menos un símbolo',
	paymentCardInvalidCvv: 'CVV inválido',
	paymentCardInvalidExpirationDate: 'Fecha de caducidad inválida',
	paymentCardInvalidNumber: 'Número de tarjeta inválido',
	dateInvalid: 'Fecha inválida',
	birthdayInvalidRange:
		'La fecha de nacimiento debe ser después del 1 de enero de 1900',
	phoneInvalid: 'Número de teléfono inválido',
	documentInvalid: 'Documento inválido',
	documentTypeMismatch: 'El tipo de documento no coincide con el número',
	documentInvalidCnpj: 'CNPJ inválido',
	documentInvalidCpf: 'CPF inválido',
	sortInvalidFormat:
		'Formato de ordenación inválido (esperado "field:asc" o "field:desc")',
	sortInvalidField:
		'Campo de ordenación inválido, esperado uno de: {expected:string}',
	sortInvalidOrder:
		'Orden de ordenación inválido, esperado uno de: {expected:string}',
	translationsInvalidLocale: `Locale inválido debe ser uno de en, es, pt-BR`,
}

const ptBR: Translations = {
	passwordMinLength: 'A senha deve ter pelo menos 8 caracteres',
	passwordMaxLength: 'A senha deve ter no máximo 64 caracteres',
	passwordMinLowercase: 'A senha deve ter pelo menos uma letra minúscula',
	passwordMinUppercase: 'A senha deve ter pelo menos uma letra maiúscula',
	passwordMinNumbers: 'A senha deve ter pelo menos um número',
	passwordMinSymbols: 'A senha deve ter pelo menos um símbolo',
	paymentCardInvalidCvv: 'CVV inválido',
	paymentCardInvalidExpirationDate: 'Data de expiração inválida',
	paymentCardInvalidNumber: 'Número do cartão inválido',
	dateInvalid: 'Data inválida',
	birthdayInvalidRange: 'O aniversário deve ser após 1 de janeiro de 1900',
	phoneInvalid: 'Número de telefone inválido',
	documentInvalid: 'Documento inválido',
	documentTypeMismatch: 'O tipo de documento não corresponde ao número',
	documentInvalidCnpj: 'CNPJ inválido',
	documentInvalidCpf: 'CPF inválido',
	sortInvalidFormat:
		'Formato de ordenação inválido (esperado "field:asc" ou "field:desc")',
	sortInvalidField:
		'Campo de ordenação inválido, esperado um dos seguintes: {expected:string}',
	sortInvalidOrder:
		'Ordem de ordenação inválida, esperado um dos seguintes: {expected:string}',
	translationsInvalidLocale: `Locale inválido deve ser um dos seguintes en, es, pt-BR`,
}

export const i18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}
