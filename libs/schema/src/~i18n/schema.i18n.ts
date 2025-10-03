import type { I18nDict } from '@starter/i18n'

const en = {
	'password.minLength': 'Password must be at least 8 characters long',
	'password.maxLength': 'Password must be at most 64 characters long',
	'password.minLowercase':
		'Password must contain at least one lowercase letter',
	'password.minUppercase':
		'Password must contain at least one uppercase letter',
	'password.minNumbers': 'Password must contain at least one number',
	'password.minSymbols': 'Password must contain at least one symbol',
	'payment_card.invalid_cvv': 'Invalid CVV',
	'payment_card.invalid_expiration_date': 'Invalid expiration date',
	'payment_card.invalid_number': 'Invalid card number',
	'date.invalid': 'Invalid date',
	'birthday.invalid_range': 'Birthday must be after January 1, 1900',
	'phone.invalid': 'Invalid phone number',
	'document.invalid': 'Invalid document',
	'document.type_mismatch': 'Document type does not match the number',
	'document.invalid_cnpj': 'Invalid CNPJ',
	'document.invalid_cpf': 'Invalid CPF',
	'sort.invalid_format':
		'Invalid sort format (expected "field:asc" or "field:desc")',
	'sort.invalid_field': 'Invalid sort field',
	'sort.invalid_order': 'Invalid sort order (must be "asc" or "desc")',
	'translations.invalid_locale': `Invalid locale must be one of en, es, pt-BR`,
}
type Translations = typeof en

const es: Translations = {
	'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
	'password.maxLength': 'La contraseña debe tener a lo sumo 64 caracteres',
	'password.minLowercase':
		'La contraseña debe contener al menos una letra minúscula',
	'password.minUppercase':
		'La contraseña debe contener al menos una letra mayúscula',
	'password.minNumbers': 'La contraseña debe contener al menos un número',
	'password.minSymbols': 'La contraseña debe contener al menos un símbolo',
	'payment_card.invalid_cvv': 'CVV inválido',
	'payment_card.invalid_expiration_date': 'Fecha de caducidad inválida',
	'payment_card.invalid_number': 'Número de tarjeta inválido',
	'date.invalid': 'Fecha inválida',
	'birthday.invalid_range':
		'La fecha de nacimiento debe ser después del 1 de enero de 1900',
	'phone.invalid': 'Número de teléfono inválido',
	'document.invalid': 'Documento inválido',
	'document.type_mismatch': 'El tipo de documento no coincide con el número',
	'document.invalid_cnpj': 'CNPJ inválido',
	'document.invalid_cpf': 'CPF inválido',
	'sort.invalid_format':
		'Formato de ordenación inválido (esperado "field:asc" o "field:desc")',
	'sort.invalid_field': 'Campo de ordenación inválido',
	'sort.invalid_order':
		'Orden de ordenación inválido (debe ser "asc" o "desc")',
	'translations.invalid_locale': `Locale inválido debe ser uno de en, es, pt-BR`,
}

const ptBR: Translations = {
	'password.minLength': 'A senha deve ter pelo menos 8 caracteres',
	'password.maxLength': 'A senha deve ter no máximo 64 caracteres',
	'password.minLowercase': 'A senha deve ter pelo menos uma letra minúscula',
	'password.minUppercase': 'A senha deve ter pelo menos uma letra maiúscula',
	'password.minNumbers': 'A senha deve ter pelo menos um número',
	'password.minSymbols': 'A senha deve ter pelo menos um símbolo',
	'payment_card.invalid_cvv': 'CVV inválido',
	'payment_card.invalid_expiration_date': 'Data de expiração inválida',
	'payment_card.invalid_number': 'Número do cartão inválido',
	'date.invalid': 'Data inválida',
	'birthday.invalid_range': 'O aniversário deve ser após 1 de janeiro de 1900',
	'phone.invalid': 'Número de telefone inválido',
	'document.invalid': 'Documento inválido',
	'document.type_mismatch': 'O tipo de documento não corresponde ao número',
	'document.invalid_cnpj': 'CNPJ inválido',
	'document.invalid_cpf': 'CPF inválido',
	'sort.invalid_format':
		'Formato de ordenação inválido (esperado "field:asc" ou "field:desc")',
	'sort.invalid_field': 'Campo de ordenação inválido',
	'sort.invalid_order':
		'Ordem de ordenação inválida (deve ser "asc" ou "desc")',
	'translations.invalid_locale': `Locale inválido deve ser um dos seguintes en, es, pt-BR`,
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}
