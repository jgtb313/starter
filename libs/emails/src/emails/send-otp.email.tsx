import { Section, Text } from '@react-email/components'

import { Layout, type WithLayoutProps } from '@/emails.layout'

export type SendOTPProps = WithLayoutProps<{
	code: string
	expiresInMinutes: number
}>

export const SendOTP = ({
	code = '4910',
	expiresInMinutes = 10,
}: SendOTPProps) => {
	return (
		<Layout title='Verification Code'>
			{(i18n) => (
				<Section>
					<Text className='text-center'>{i18n.sendOTPDescription()}</Text>

					<Section className='mx-auto my-[30px] w-[240px] rounded-[4px] bg-neutral-100'>
						<Text className='mx-auto w-full py-[8px] text-center font-bold text-[24px] text-black leading-[30px] tracking-[6px]'>
							{code}
						</Text>
					</Section>

					<Text className='text-center'>
						{i18n.sendOTPCodeValidity({
							expiresInMinutes,
						})}
					</Text>
				</Section>
			)}
		</Layout>
	)
}

SendOTP.subject = 'Verification Code'

export default SendOTP
