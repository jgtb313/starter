import { forwardRef, PropsWithChildren } from 'react'

import type {
	InputOTPProps,
	InputOTPGroupProps,
	InputOTPSlotProps,
	InputOTPSeparatorProps,
} from '@/components/input-otp/input-otp.types'
import {
	InputOTP as ShadcnInputOTP,
	InputOTPGroup as ShadcnInputOTPGroup,
	InputOTPSlot as ShadcnInputOTPSlot,
	InputOTPSeparator as ShadcnInputOTPSeparator,
} from '@/shadcn/input-otp'

const WrappedInputOTP = forwardRef<
	HTMLInputElement,
	PropsWithChildren<InputOTPProps>
>(({ className, maxLength = 6, ...props }, ref) => {
	return (
		<ShadcnInputOTP
			className={className}
			maxLength={maxLength}
			ref={ref}
			children={props.children}
		/>
	)
})

const WrappedInputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
	({ className }, ref) => (
		<ShadcnInputOTPGroup
			className={className}
			ref={ref}
		/>
	),
)

const WrappedInputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
	({ className, index }, ref) => (
		<ShadcnInputOTPSlot
			className={className}
			index={index}
			ref={ref}
		/>
	),
)

const WrappedInputOTPSeparator = forwardRef<
	HTMLDivElement,
	InputOTPSeparatorProps
>(({ className }, ref) => (
	<ShadcnInputOTPSeparator
		className={className}
		ref={ref}
	/>
))

export const InputOTP = Object.assign(WrappedInputOTP, {
	Group: WrappedInputOTPGroup,
	Slot: WrappedInputOTPSlot,
	Separator: WrappedInputOTPSeparator,
})
