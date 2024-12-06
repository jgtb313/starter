import { LoaderFunctionArgs } from '@remix-run/node'

export const getFormData = async <T>({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData()

  return Object.fromEntries(formData) as T
}
