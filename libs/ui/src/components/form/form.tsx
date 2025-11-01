import type { PropsWithChildren } from 'react'

import { Flex } from '@/components/flex'
import type { FormItemProps, FormProps } from '@/components/form/form.types'
import { Label } from '@/components/label'

const FormRoot = ({ children, ...props }: PropsWithChildren<FormProps>) => {
	return <form {...props}>{children}</form>
}

const FormItem = ({
	label,
	error,
	children,
	...props
}: PropsWithChildren<FormItemProps>) => {
	return (
		<Flex
			direction="col"
			gap="2"
			{...props}
		>
			{label && <Label>{label}</Label>}

			{children}

			{error && <p className="text-red-500">{error}</p>}
		</Flex>
	)
}

export const Form = Object.assign(FormRoot, {
	Item: FormItem,
})
