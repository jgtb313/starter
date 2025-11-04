import { forwardRef } from 'react'

import type { InputProps } from '@/components/input/input.types'
import { Input as ShadcnInput } from '@/shadcn/input'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      value,
      placeholder,
      disabled = false,
      onChange,
    },
    ref,
  ) => {
    return (
      <ShadcnInput
        className={className}
        type={type}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref={ref}
      />
    )
  },
)
