import { config } from '@starter/config'

import { Button, Section, Text } from '@react-email/components'

import { Layout, type WithLayoutProps } from '@/emails.layout'

export type WelcomeProps = WithLayoutProps<{
	name: string
	getStartedUrl: string
}>

export const Welcome = ({
	name = 'John Doe',
	getStartedUrl = 'https://google.com',
	...props
}: WelcomeProps) => {
	return (
		<Section>
			<Text className='text-center text-[18px] leading-[28px]'>Welcome</Text>

			<Text className='mt-[20px] text-center'>
				We're excited to have you on board. With {config.name}, you can easily
				manage your products, track inventory in real time, and keep everything
				organized.
			</Text>

			<Section className='mx-auto my-[30px] w-[280px]'>
				<Button
					className='block cursor-pointer rounded-md p-4 text-center font-bold text-[16px] text-white no-underline'
					style={{
						backgroundColor: config.theme.palette.primary,
					}}
					href={getStartedUrl}
				>
					Get Started
				</Button>
			</Section>

			<Text className='text-center'>
				Thanks for joining us, <br />— The {config.name} Team
			</Text>

			<Text className='mt-[20px] text-center text-[14px] text-neutral-500'>
				Thanks for joining us, <br />— The {config.name} Team
			</Text>
		</Section>
	)
}

Welcome.subject = `Welcome to ${config.name} 🎉`

export default Welcome
