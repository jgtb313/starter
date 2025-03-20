import { PropsWithChildren } from 'react'
import { Tailwind, Html, Head, Body, Container, Heading, Section, Img, Hr, Link, Row, Column, Text } from '@react-email/components'
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
              <Row width={90} align="center">
                <Column className="pr-[8px]">
                  <Link href={config.social.facebook}>
                    <Img src="https://i.imgur.com/ess1JW0.png" alt="Facebook" width={30} height={30} />
                  </Link>
                </Column>
                <Column className="pr-[8px]">
                  <Link href={config.social.twitter}>
                    <Img src="https://i.imgur.com/DsoTAYE.png" alt="Twitter" width={30} height={30} />
                  </Link>
                </Column>
                <Column className="pr-[8px]">
                  <Link href={config.social.instagram}>
                    <Img src="https://i.imgur.com/A46ahq8.png" alt="Instagram" width={30} height={30} />
                  </Link>
                </Column>
              </Row>

              <Row>
                <Text className="text-center text-gray-500 text-xs leading-[18px] mt-4 mb-2">
                  © {new Date().getFullYear()} {config.name}. All Rights Reserved.
                </Text>

                <Text className="text-center text-gray-500 text-xs leading-[18px] m-0">{config.address}</Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
