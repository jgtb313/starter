import { Button, Flex, Form, Input } from '@starter/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useSignIn } from '@/~client/hooks'
import { signInMutationRequestSchema } from '@/~client/schemas'
import type { SignInMutationRequest } from '@/~client/types'
import type { SignInFormProps } from '@/components/sign-in-form/sign-in-form.types'

export const SignInForm = ({}: SignInFormProps) => {
	const { mutate: signIn } = useSignIn()
	const form = useForm<SignInMutationRequest>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(signInMutationRequestSchema),
	})

	const onSubmit = (data: SignInMutationRequest) => {
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
				<Form.Item
					error={form.formState.errors.email?.message}
					label="Email"
				>
					<Controller
						control={form.control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Email"
								type="email"
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					error={form.formState.errors.password?.message}
					label="Password"
				>
					<Controller
						control={form.control}
						name="password"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Password"
								type="password"
							/>
						)}
					/>
				</Form.Item>
				<Button
					className="w-full"
					type="submit"
				>
					Sign In
				</Button>
			</Flex>
		</Form>
	)
}
