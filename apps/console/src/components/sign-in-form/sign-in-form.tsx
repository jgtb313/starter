import { useI18n } from '@starter/react-i18n'
import { Button, Flex, Form, Input } from '@starter/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useSignIn } from '@/~client/hooks/useSignIn'
import { signInMutationRequestSchema } from '@/~client/schemas/signInSchema'
import type { SignInMutationRequest } from '@/~client/types'
import type { SignInFormProps } from '@/components/sign-in-form/sign-in-form.types'

export const SignInForm = ({}: SignInFormProps) => {
	const { mutate: signIn } = useSignIn()
	const i18n = useI18n()
	const form = useForm<SignInMutationRequest>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(signInMutationRequestSchema),
	})

	const onSubmit = (data: { email: string; password: string }) => {
		signIn(
			{
				data,
			},
			{
				onSuccess: (response) => {
					console.log('success', response)
				},
				onError: (error) => {
					console.log('error', error)
				},
			},
		)
	}

	return (
		<Form onSubmit={form.handleSubmit(onSubmit)}>
			<Flex
				direction="col"
				gap="4"
			>
				<Form.Field>
					<Form.FieldLabel>{i18n.t.email()}</Form.FieldLabel>

					<Controller
						control={form.control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								placeholder={i18n.t.email()}
								type="email"
							/>
						)}
					/>

					<Form.FieldError error={form.formState.errors.email?.message} />
				</Form.Field>
				<Form.Field>
					<Form.FieldLabel>{i18n.t.password()}</Form.FieldLabel>

					<Controller
						control={form.control}
						name="password"
						render={({ field }) => (
							<Input
								{...field}
								placeholder={i18n.t.password()}
								type="password"
							/>
						)}
					/>

					<Form.FieldError error={form.formState.errors.password?.message} />
				</Form.Field>
				<Button
					className="w-full"
					type="submit"
				>
					{i18n.t.signIn()}
				</Button>
			</Flex>
		</Form>
	)
}
