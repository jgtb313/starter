import { Section, Text } from '@react-email/components'

import { IEmails } from '@/interfaces'
import { Layout } from '@/emails.layout'

export const Welcome = ({ message }: IEmails['WELCOME']) => {
  return (
    <Layout title="Verification Code">
      <Section>
        <Text className="text-center">Use the code provided in this email to authorize access to your account.</Text>

        <Section className="bg-neutral-100 rounded-[4px] my-[30px] mx-auto w-[280px]">
          <Text className="text-black font-bold text-[32px] tracking-[6px] leading-[40px] py-[8px] mx-auto w-full text-center">{message}</Text>
        </Section>

        <Text className="text-center">
          This code is valid for <strong>10 minutes</strong>, starting from the moment you received this email.
        </Text>
      </Section>
    </Layout>
  )
}

Welcome.subject = 'Welcome'
