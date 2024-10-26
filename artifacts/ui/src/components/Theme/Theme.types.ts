export type ThemeColorScheme = 'dark' | 'light'

export type ThemeProps = {
  colorScheme?: ThemeColorScheme
  palette?: {
    primary: string
  }
}
