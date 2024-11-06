import { createContext, useContext } from 'react'
import { SearchContextProps } from './Search.types'

export const SearchContext = createContext<any>(null)

export const useSearch = <T>() => {
  const context = useContext<SearchContextProps<T> | undefined>(SearchContext)

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return context
}
