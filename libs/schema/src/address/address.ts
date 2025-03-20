import { z } from '@/zod'
import { clearSpecialChars } from '@starter/common'

const AddressId = z.string().min(1)

const Title = z.string().trim()

const State = z.string().trim().min(1)

const City = z.string().trim().min(1)

const ZipCode = z
  .string()
  .trim()
  .min(1)
  .transform((value) => clearSpecialChars(value).replace(/\s+/g, ''))

const Neighborhood = z.string().trim().min(1)

const Street = z.string().trim().min(1)

const Number = z.string().trim().min(1)

const Lat = z.number()

const Lng = z.number()

const Complement = z
  .string()
  .nullish()
  .transform((value) => value ?? null)

const Landmark = z
  .string()
  .nullish()
  .transform((value) => value ?? null)

const Main = z.boolean().default(false)

export const BaseAddressSchema = z.object({
  id: AddressId,
  state: State,
  city: City,
  zipCode: ZipCode,
  neighborhood: Neighborhood,
  street: Street,
  number: Number,
  complement: Complement,
})
export type BaseAddress = z.infer<typeof BaseAddressSchema>

export const BusinessAddressSchema = z.object({
  id: AddressId,
  state: State,
  city: City,
  zipCode: ZipCode,
  neighborhood: Neighborhood,
  street: Street,
  number: Number,
  lat: Lat,
  lng: Lng,
  complement: Complement,
  landmark: Landmark,
})
export type BusinessAddress = z.infer<typeof BusinessAddressSchema>

export const CustomerAddressSchema = z.object({
  id: AddressId,
  title: Title,
  state: State,
  city: City,
  zipCode: ZipCode,
  neighborhood: Neighborhood,
  street: Street,
  number: Number,
  lat: Lat,
  lng: Lng,
  complement: Complement,
  landmark: Landmark,
  main: Main,
})
export type CustomerAddress = z.infer<typeof CustomerAddressSchema>
