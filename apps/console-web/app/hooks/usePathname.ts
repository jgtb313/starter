import { useLocation } from '@remix-run/react'

export const usePathname = () => {
  const location = useLocation()

  return location.pathname
}
