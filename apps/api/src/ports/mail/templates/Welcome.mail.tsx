import { PropsWithChildren } from 'react'
import { Tailwind, Html, Head, Body, Container, Text, Heading, Section, Img, Hr } from '@react-email/components'
// import { config } from '@starter/config'

import { Layout } from './Layout.mail'

type WelcomeMailProps = {
  title: string
}

const WelcomeMail = ({}: PropsWithChildren<WelcomeMailProps>) => {
  return <Layout title="Title"></Layout>
}

export default WelcomeMail
