import { formatToBRL as bformatToBRL } from 'brazilian-values'

export const formatToBRL = (value: number) => {
  return bformatToBRL(Number(value) / 100)
}
