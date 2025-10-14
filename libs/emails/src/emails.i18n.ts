import type { Locale } from '@starter/schema'
import { createI18n, type InferI18n } from '@starter/i18n'

import { type I18nEmails, i18nDict } from '~/i18n'

export const defaultLocale: Locale = 'en'

export const i18n = createI18n(i18nDict, defaultLocale) as InferI18n<I18nEmails>
