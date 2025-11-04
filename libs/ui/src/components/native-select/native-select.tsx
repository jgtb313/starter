import { forwardRef, type PropsWithChildren } from 'react'

import type {
	NativeSelectOptGroupProps,
	NativeSelectOptionProps,
	NativeSelectProps,
} from '@/components/native-select/native-select.types'
import {
	NativeSelect as ShadcnNativeSelect,
	NativeSelectOptGroup as ShadcnNativeSelectOptGroup,
	NativeSelectOption as ShadcnNativeSelectOption,
} from '@/shadcn/native-select'

const WrappedNativeSelect = forwardRef<
	HTMLSelectElement,
	PropsWithChildren<NativeSelectProps>
>(({ className, value, disabled = false, onChange, ...props }, ref) => {
	return (
		<ShadcnNativeSelect
			className={className}
			disabled={disabled}
			onChange={onChange}
			ref={ref}
			value={value}
			{...props}
		/>
	)
})

const WrappedNativeSelectOption = forwardRef<
	HTMLOptionElement,
	PropsWithChildren<NativeSelectOptionProps>
>(({ value, disabled = false, children }, ref) => (
	<ShadcnNativeSelectOption
		disabled={disabled}
		ref={ref}
		value={value}
	>
		{children}
	</ShadcnNativeSelectOption>
))

const WrappedNativeSelectOptGroup = forwardRef<
	HTMLOptGroupElement,
	PropsWithChildren<NativeSelectOptGroupProps>
>(({ className, label, children }, ref) => (
	<ShadcnNativeSelectOptGroup
		className={className}
		label={label}
		ref={ref}
	>
		{children}
	</ShadcnNativeSelectOptGroup>
))

export const NativeSelect = Object.assign(WrappedNativeSelect, {
	Option: WrappedNativeSelectOption,
	OptGroup: WrappedNativeSelectOptGroup,
})
