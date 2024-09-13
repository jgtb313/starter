import { countriesPhone } from '../assets/countries-phone'
import { clearSpecialChars } from './clearSpecialChars'

export type IsPhoneOptions = {
  iso: string
  ddi: string
  number: string
}

export const isPhone = ({ iso, ddi, number }: IsPhoneOptions) => {
  const item = countriesPhone.find((item) => item.iso === iso && item.code === ddi)

  if (!item) {
    return false
  }

  const rgx = Array.isArray(item.regex) ? item.regex : [item.regex]

  const value = clearSpecialChars(number).replace(/ /g, '')

  return rgx.some((rgx) => rgx.test(value))
}
