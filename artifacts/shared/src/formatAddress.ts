import { formatZipcode } from './formatZipcode'

export type FormatAddressInput = {
  neighborhood: string
  street: string
  state?: string
  city?: string
  number?: string
  zipcode?: string
  complement?: string | null
}

type FormatAddressOptions = {
  place?: boolean
  short?: boolean
  complement?: boolean
}

export const formatAddress = (
  { state, city, street, number, neighborhood, zipcode, complement }: FormatAddressInput,
  opts?: FormatAddressOptions
) => {
  if (opts?.short) {
    return number ? `${street}, ${number}` : street
  }

  if (opts?.place) {
    return `${neighborhood}, ${city} - ${state}`
  }

  if (opts?.complement) {
    return complement ? `${complement} - ${city}/${state}` : `${city}/${state}`
  }

  return zipcode ? `${street}, ${number} • ${neighborhood}, CEP ${formatZipcode(zipcode)}` : `${street}, ${number} • ${neighborhood}`
}
