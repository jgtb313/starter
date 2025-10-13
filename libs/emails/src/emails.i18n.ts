import { createI18n, type InferI18n } from '@starter/i18n'

import { type I18nEmails, i18nDict } from '~/i18n'

export const i18n = createI18n(i18nDict) as InferI18n<I18nEmails>
