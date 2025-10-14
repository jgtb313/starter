import { config } from '@starter/config'
import type { Locale } from '@starter/schema'

import { Button, Section, Text } from '@react-email/components'

import { defaultLocale, i18n } from '@/emails.i18n'
import { Layout, type WithLayoutProps } from '@/emails.layout'

export type WelcomeProps = WithLayoutProps<{
	userName: string
	getStartedUrl: string
}>

export const Welcome = ({
	locale = defaultLocale,
	userName = 'John Doe',
	getStartedUrl = 'https://google.com',
}: WelcomeProps) => {
	return (
		<Layout
			title={i18n.custom(locale).welcomeTitle({
				appName: config.name,
			})}
		>
			<Section>
				<Text className='mt-[20px] text-center'>
					{i18n.custom(locale).welcomeDescription({
						appName: config.name,
						userName,
					})}
				</Text>

				<Section className='mx-auto my-[30px] w-[280px]'>
					<Button
						className='block cursor-pointer rounded-md p-4 text-center font-bold text-[16px] text-white no-underline'
						style={{
							backgroundColor: config.theme.palette.primary,
						}}
						href={getStartedUrl}
					>
						{i18n.custom(locale).welcomeGetStarted()}
					</Button>
				</Section>

				<Text className='mt-[20px] text-center text-[14px] text-neutral-500'>
					<span
						dangerouslySetInnerHTML={{
							__html: i18n.custom(locale).welcomeThanks({
								appName: config.name,
							}),
						}}
					/>
				</Text>
			</Section>
		</Layout>
	)
}

Welcome.subject = (locale: Locale) =>
	i18n.custom(locale).welcomeTitle({
		appName: config.name,
	})

export default Welcome
