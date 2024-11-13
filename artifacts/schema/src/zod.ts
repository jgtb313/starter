import { z, ZodSchema } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { zodI18nMap } from 'zod-i18n-map'
import i18next from 'i18next'
import translations from './translations.json'

extendZodWithOpenApi(z)

i18next.init({
  lng: 'es',
  resources: {
    es: { zod: translations },
  },
})
z.setErrorMap(zodI18nMap)

export { z, ZodSchema }
