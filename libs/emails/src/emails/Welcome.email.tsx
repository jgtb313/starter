import { config } from '@starter/config'

import { Button, Section, Text } from '@react-email/components'

import { Layout } from '@/emails.layout'

export type WelcomeProps = {
	name: string
	getStartedUrl: string
}

export const Welcome = ({
	name = 'John Doe',
	getStartedUrl = 'https://google.com',
}: WelcomeProps) => {
	return (
		<Layout title='Welcome'>
			<Section>
				<Text className='text-center text-[18px] leading-[28px]'>
					🎉 Hello {name}, welcome to <strong>{config.name}</strong>!
				</Text>

				<Text className='mt-[20px] text-center'>
					We’re excited to have you on board. With {config.name}, you can easily
					manage your products, track inventory in real time, and keep
					everything organized.
				</Text>

				<Section className='mx-auto my-[30px] w-[280px]'>
					<Button
						className='block cursor-pointer rounded-md p-4 text-center font-bold text-[16px] text-white no-underline'
						style={{
							backgroundColor: config.theme.palette.primary,
						}}
						href={getStartedUrl}
					>
						Get started
					</Button>
				</Section>

				<Text className='text-center'>
					To begin, log in to your account and explore the dashboard. If you
					have any questions, our support team is always ready to help.
				</Text>

				<Text className='mt-[20px] text-center text-[14px] text-neutral-500'>
					Thanks for joining us, <br />— The {config.name} Team
				</Text>
			</Section>
		</Layout>
	)
}

Welcome.subject = `Welcome to ${config.name} 🎉`

export default Welcome
