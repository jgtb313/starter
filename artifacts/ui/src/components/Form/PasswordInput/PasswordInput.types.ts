import { PasswordInputProps as ComponentProps } from '@mantine/core'

export type PasswordInputProps = {
  name: string
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  hint?: string
  onChange?: (value?: string) => void
  onBlur?: () => void
}
