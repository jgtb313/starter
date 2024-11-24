import { PropsWithChildren } from 'react'
import { Tailwind, Html, Head, Body, Container, Heading, Section, Row, Img, Hr } from '@react-email/components'
import { config } from '@starter/config'

type LayoutProps = {
  title: string
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
  return (
    <Html>
      <Head />

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] mx-auto my-[40px] p-[20px] max-w-[465px] rounded">
            <Img className="block mx-auto" src={config.logo.light} alt="Logo" />

            <Heading className="font-normal text-black text-center text-[24px] p-0 my-[30px] mx-0">{title}</Heading>

            {children}

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Section>
              <Row>
                <Img src="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/slack-facebook.png" width="24" height="24" alt="Slack" />

                <Img src="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/slack-facebook.png" width="24" height="24" alt="Slack" />

                <Img src="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/slack-facebook.png" width="24" height="24" alt="Slack" />

                <Img src="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/slack-facebook.png" width="24" height="24" alt="Slack" />
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
