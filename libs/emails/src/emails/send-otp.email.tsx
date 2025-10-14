import type { Locale } from '@starter/schema'

import { Section, Text } from '@react-email/components'

import { defaultLocale, i18n } from '@/emails.i18n'
import { Layout, type WithLayoutProps } from '@/emails.layout'

export type SendOTPProps = WithLayoutProps<{
	code: string
	expiresInMinutes: number
}>

export const SendOTP = ({
	locale = defaultLocale,
	code = '4910',
	expiresInMinutes = 10,
}: SendOTPProps) => {
	return (
		<Layout title={i18n.custom(locale).sendOTPTitle()}>
			<Section>
				<Text className='text-center'>
					{i18n.custom(locale).sendOTPDescription()}
				</Text>

				<Section className='mx-auto my-[30px] w-[240px] rounded-[4px] bg-neutral-100'>
					<Text className='mx-auto w-full py-[8px] text-center font-bold text-[24px] text-black leading-[30px] tracking-[6px]'>
						{code}
					</Text>
				</Section>

				<Text className='text-center'>
					<span
						dangerouslySetInnerHTML={{
							__html: i18n.custom(locale).sendOTPCodeValidity({
								expiresInMinutes,
							}),
						}}
					/>
				</Text>
			</Section>
		</Layout>
	)
}

SendOTP.subject = (locale: Locale) => i18n.custom(locale).sendOTPTitle()

export default SendOTP
