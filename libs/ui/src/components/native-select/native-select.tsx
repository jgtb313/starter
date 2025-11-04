import { forwardRef, type PropsWithChildren } from 'react'

import type {
	NativeSelectProps,
	NativeSelectOptionProps,
	NativeSelectOptGroupProps,
} from '@/components/native-select/native-select.types'
import {
	NativeSelect as ShadcnNativeSelect,
	NativeSelectOption as ShadcnNativeSelectOption,
	NativeSelectOptGroup as ShadcnNativeSelectOptGroup,
} from '@/shadcn/native-select'

const WrappedNativeSelect = forwardRef<
	HTMLSelectElement,
	PropsWithChildren<NativeSelectProps>
>(({ className, value, disabled = false, onChange }, ref) => {
	return (
		<ShadcnNativeSelect
			className={className}
			value={value}
			disabled={disabled}
			onChange={onChange}
			ref={ref}
		/>
	)
})

const WrappedNativeSelectOption = forwardRef<
	HTMLOptionElement,
	PropsWithChildren<NativeSelectOptionProps>
>(({ value, disabled = false, children }, ref) => (
	<ShadcnNativeSelectOption
		value={value}
		disabled={disabled}
		ref={ref}
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
