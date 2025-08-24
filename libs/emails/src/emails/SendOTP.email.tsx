import { Section, Text } from '@react-email/components'

import { Layout } from '@/emails.layout'
import type { IEmails } from '@/interfaces'

export const SendOTP = ({ code = '4910' }: IEmails['SEND_OTP']) => {
	return (
		<Layout title='Verification Code'>
			<Section>
				<Text className='text-center'>
					Use the code provided in this email to authorize access to your
					account.
				</Text>

				<Section className='mx-auto my-[30px] w-[280px] rounded-[4px] bg-neutral-100'>
					<Text className='mx-auto w-full py-[8px] text-center font-bold text-[32px] text-black leading-[40px] tracking-[6px]'>
						{code}
					</Text>
				</Section>

				<Text className='text-center'>
					This code is valid for <strong>10 minutes</strong>, starting from the
					moment you received this email.
				</Text>
			</Section>
		</Layout>
	)
}

SendOTP.subject = 'Verification Code'
