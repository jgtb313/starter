export type FormProps = {
  className?: string
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export type FormFieldProps = {
  className?: string
  orientation?: 'vertical' | 'horizontal' | 'responsive'
}

export type FormFieldLabelProps = {
  className?: string
}

export type FormFieldDescriptionProps = {
  className?: string
}

export type FormFieldErrorProps = {
  className?: string
  error?: string | undefined
}

export type FormFieldGroupProps = {
  className?: string
}

export type FormFieldLegendProps = {
  className?: string
  variant?: 'legend' | 'label'
}

export type FormFieldSeparatorProps = {
  className?: string
}

export type FormFieldSetProps = {
  className?: string
}

export type FormFieldContentProps = {
  className?: string
}

export type FormFieldTitleProps = {
  className?: string
}
