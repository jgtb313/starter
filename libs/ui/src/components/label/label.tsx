import { forwardRef, type PropsWithChildren } from 'react'

import type { LabelProps } from './label.types'
import { Label as ShadcnLabel } from '@/shadcn/label'

export const Label = forwardRef<HTMLLabelElement, PropsWithChildren<LabelProps>>(
  (
    {
      className,
      htmlFor,
      children,
    },
    ref,
  ) => {
    return (
      <ShadcnLabel
        className={className}
        htmlFor={htmlFor}
        ref={ref}
      >
        {children}
      </ShadcnLabel>
    )
  },
)



