import {
  CheckboxProps,
  CheckboxGroupProps,
  ColorInputProps,
  CurrencyInputProps,
  DateInputProps,
  DocumentInputProps,
  InputProps,
  MaskInputProps,
  PasswordInputProps,
  PhoneInputProps,
  PinInputProps,
  RadioProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  TextareaProps,
  UploadProps
} from '@ss/components'

type SearchItemProps<T> = Omit<T, 'name'>

type SearchValue<T> = T

type SearchItem<T> =
  | { component: 'Checkbox'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<CheckboxProps> }
  | { component: 'CheckboxGroup'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<CheckboxGroupProps> }
  | { component: 'ColorInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<ColorInputProps> }
  | { component: 'CurrencyInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<CurrencyInputProps> }
  | { component: 'DateInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<DateInputProps> }
  | { component: 'DocumentInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<DocumentInputProps> }
  | { component: 'Input'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<InputProps> }
  | { component: 'MaskInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<MaskInputProps> }
  | { component: 'PasswordInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<PasswordInputProps> }
  | { component: 'PhoneInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<PhoneInputProps> }
  | { component: 'PinInput'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<PinInputProps> }
  | { component: 'Radio'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<RadioProps> }
  | { component: 'RadioGroup'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<RadioGroupProps> }
  | { component: 'Select'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<SelectProps<T>> }
  | { component: 'Switch'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<SwitchProps> }
  | { component: 'Textarea'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<TextareaProps> }
  | { component: 'Upload'; name: keyof T; label: string; placeholder?: string; props?: SearchItemProps<UploadProps> }

export type SearchContextProps<T> = {
  state?: T
  items?: SearchItem<T>[]
  updateFilter: (value?: string) => void
  updateState: (state: T) => void
  removePath: (path: string) => void
  cancel: () => void
}

export type SearchProps<T> = {
  value?: SearchValue<T>
  items?: SearchItem<T>[]
  onChange?: (input: T) => void

  children: (props: { open: () => void; close: () => void }) => React.ReactNode
}

export type SearchInputProps = {
  placeholder?: string
  onChange?: (input?: string) => void
}
