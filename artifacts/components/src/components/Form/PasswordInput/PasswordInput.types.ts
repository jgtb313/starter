import { PasswordInputProps as MPasswordInputProps } from '@mantine/core'

export type PasswordInputProps = {
  name: string
  label?: string
  placeholder?: string
  size?: MPasswordInputProps['size']
  hint?: string
  onChange?: (value?: string) => void
  onBlur?: () => void
}
