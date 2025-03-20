import { z, ZodSchema, ZodType } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { makeZodI18nMap } from 'zod-i18n-map'
import i18next from 'i18next'

import translations from './translations.json'

extendZodWithOpenApi(z)

i18next.init({
  compatibilityJSON: 'v4',
  lng: 'ptBR',
  resources: {
    ptBR: { zod: translations },
  },
})

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }))

export { z, ZodSchema, ZodType }
