import { forwardRef, type PropsWithChildren } from 'react'

import type {
	FormFieldContentProps,
	FormFieldDescriptionProps,
	FormFieldErrorProps,
	FormFieldGroupProps,
	FormFieldLabelProps,
	FormFieldLegendProps,
	FormFieldProps,
	FormFieldSeparatorProps,
	FormFieldSetProps,
	FormFieldTitleProps,
	FormProps,
} from '@/components/form/form.types'
import {
	Field as ShadcnField,
	FieldContent as ShadcnFieldContent,
	FieldDescription as ShadcnFieldDescription,
	FieldError as ShadcnFieldError,
	FieldGroup as ShadcnFieldGroup,
	FieldLabel as ShadcnFieldLabel,
	FieldLegend as ShadcnFieldLegend,
	FieldSeparator as ShadcnFieldSeparator,
	FieldSet as ShadcnFieldSet,
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
>(({ className, orientation = 'vertical', ...props }, ref) => (
	<ShadcnField
		className={className}
		orientation={orientation}
		ref={ref}
		{...props}
	/>
))

const WrappedFormFieldLabel = forwardRef<
	HTMLLabelElement,
	PropsWithChildren<FormFieldLabelProps>
>(({ className, ...props }, ref) => (
	<ShadcnFieldLabel
		className={className}
		ref={ref}
		{...props}
	/>
))

const WrappedFormFieldDescription = forwardRef<
	HTMLParagraphElement,
	PropsWithChildren<FormFieldDescriptionProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldDescription
		className={className}
		ref={ref}
		{...props}
	>
		{children}
	</ShadcnFieldDescription>
))

const WrappedFormFieldError = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldErrorProps>
>(({ className, error, ...props }, ref) => (
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
		{...props}
	/>
))

const WrappedFormFieldGroup = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldGroupProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldGroup
		className={className}
		ref={ref}
		{...props}
	>
		{children}
	</ShadcnFieldGroup>
))

const WrappedFormFieldLegend = forwardRef<
	HTMLLegendElement,
	PropsWithChildren<FormFieldLegendProps>
>(({ className, variant = 'legend', children, ...props }, ref) => (
	<ShadcnFieldLegend
		className={className}
		ref={ref}
		variant={variant}
		{...props}
	>
		{children}
	</ShadcnFieldLegend>
))

const WrappedFormFieldSeparator = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldSeparatorProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldSeparator
		className={className}
		ref={ref}
		{...props}
	>
		{children}
	</ShadcnFieldSeparator>
))

const WrappedFormFieldSet = forwardRef<
	HTMLFieldSetElement,
	PropsWithChildren<FormFieldSetProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldSet
		className={className}
		ref={ref}
		{...props}
	>
		{children}
	</ShadcnFieldSet>
))

const WrappedFormFieldContent = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldContentProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldContent
		className={className}
		ref={ref}
		{...props}
	>
		{children}
	</ShadcnFieldContent>
))

const WrappedFormFieldTitle = forwardRef<
	HTMLDivElement,
	PropsWithChildren<FormFieldTitleProps>
>(({ className, children, ...props }, ref) => (
	<ShadcnFieldTitle
		className={className}
		ref={ref}
		{...props}
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
