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
            <Img className="block mx-auto" src={config.logo.light.png} alt="Logo" />

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
                <Text style={{ textAlign: 'center', color: '#706a7b', fontSize: '12px', lineHeight: '18px', marginTop: 16, marginBottom: 8 }}>
                  © {new Date().getFullYear()} {config.name}. All Rights Reserved.
                </Text>

                <Text style={{ textAlign: 'center', color: '#706a7b', fontSize: '12px', lineHeight: '18px', margin: 0 }}>{config.address}</Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
