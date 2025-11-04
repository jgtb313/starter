import { forwardRef, type PropsWithChildren } from 'react'

import type {
	FormProps,
	FormFieldProps,
	FormFieldLabelProps,
	FormFieldDescriptionProps,
	FormFieldErrorProps,
	FormFieldGroupProps,
	FormFieldLegendProps,
	FormFieldSeparatorProps,
	FormFieldSetProps,
	FormFieldContentProps,
	FormFieldTitleProps,
} from '@/components/form/form.types'
import {
	Field as ShadcnField,
	FieldLabel as ShadcnFieldLabel,
	FieldDescription as ShadcnFieldDescription,
	FieldError as ShadcnFieldError,
	FieldGroup as ShadcnFieldGroup,
	FieldLegend as ShadcnFieldLegend,
	FieldSeparator as ShadcnFieldSeparator,
	FieldSet as ShadcnFieldSet,
	FieldContent as ShadcnFieldContent,
	FieldTitle as ShadcnFieldTitle,
} from '@/shadcn/field'

const WrappedForm = forwardRef<HTMLFormElement, PropsWithChildren<FormProps>>(
	({ className, onSubmit, children }, ref) => (
		<form
			className={className}
			onSubmit={onSubmit}
			ref={ref}
		>
			{children}
		</form>
	),
)

const WrappedFormField = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldProps>
>(({ className, orientation = 'vertical' }, ref) => (
	<ShadcnField
		className={className}
		orientation={orientation}
		ref={ref}
	/>
))

const WrappedFormFieldLabel = forwardRef<
	HTMLLabelElement,
	PropsWithChildren<FormFieldLabelProps>
>(({ className }, ref) => (
	<ShadcnFieldLabel
		className={className}
		ref={ref}
	/>
))

const WrappedFormFieldDescription = forwardRef<
	HTMLParagraphElement,
	PropsWithChildren<FormFieldDescriptionProps>
>(({ className, children }, ref) => (
	<ShadcnFieldDescription
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldDescription>
))

const WrappedFormFieldError = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldErrorProps>
>(({ className, error }, ref) => (
	<ShadcnFieldError
		className={className}
		errors={
			error
				? [
						{
							message: error,
						},
					]
				: undefined
		}
		ref={ref}
	/>
))

const WrappedFormFieldGroup = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldGroupProps>
>(({ className, children }, ref) => (
	<ShadcnFieldGroup
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldGroup>
))

const WrappedFormFieldLegend = forwardRef<
	HTMLLegendElement,
	PropsWithChildren<FormFieldLegendProps>
>(({ className, variant = 'legend', children }, ref) => (
	<ShadcnFieldLegend
		className={className}
		variant={variant}
		ref={ref}
	>
		{children}
	</ShadcnFieldLegend>
))

const WrappedFormFieldSeparator = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldSeparatorProps>
>(({ className, children }, ref) => (
	<ShadcnFieldSeparator
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldSeparator>
))

const WrappedFormFieldSet = forwardRef<
	HTMLFieldSetElement,
	PropsWithChildren<FormFieldSetProps>
>(({ className, children }, ref) => (
	<ShadcnFieldSet
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldSet>
))

const WrappedFormFieldContent = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldContentProps>
>(({ className, children }, ref) => (
	<ShadcnFieldContent
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldContent>
))

const WrappedFormFieldTitle = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldTitleProps>
>(({ className, children }, ref) => (
	<ShadcnFieldTitle
		className={className}
		ref={ref}
	>
		{children}
	</ShadcnFieldTitle>
))

export const Form = Object.assign(WrappedForm, {
	Field: WrappedFormField,
	FieldLabel: WrappedFormFieldLabel,
	FieldDescription: WrappedFormFieldDescription,
	FieldError: WrappedFormFieldError,
	FieldGroup: WrappedFormFieldGroup,
	FieldLegend: WrappedFormFieldLegend,
	FieldSeparator: WrappedFormFieldSeparator,
	FieldSet: WrappedFormFieldSet,
	FieldContent: WrappedFormFieldContent,
	FieldTitle: WrappedFormFieldTitle,
})
