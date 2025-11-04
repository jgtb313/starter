export type NativeSelectProps = {
  className?: string
  value?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export type NativeSelectOptionProps = {
  value: string
  disabled?: boolean
}

export type NativeSelectOptGroupProps = {
  className?: string
  label: string
}
