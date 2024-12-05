import { PropsWithChildren } from 'react'
import { Tailwind, Html, Head, Body, Container, Heading, Section, Img, Hr, Link, Row, Column } from '@react-email/components'
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

            <Section className="text-center">
              <div>
                <div>
                  <Link href={config.social.facebook}>
                    <Img className="inline-block w-[30px] h-[30px]" src="https://i.imgur.com/ess1JW0.png" alt="Facebook" />
                  </Link>
                </div>

                <div>
                  <Link href={config.social.twitter}>
                    <Img className="inline-block w-[30px] h-[30px]" src="https://i.imgur.com/DsoTAYE.png" alt="Twitter" />
                  </Link>
                </div>

                <div>
                  <Link href={config.social.instagram}>
                    <Img className="inline-block w-[30px] h-[30px]" src="https://i.imgur.com/A46ahq8.png" alt="Instagram" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-[8px] text-[#999] text-[14px]">
                <div className="flex items-center justify-center">
                  <Img className="w-[16px] h-[16px] mr-[8px]" src="https://i.imgur.com/AZMfbyN.png" alt="Phone" />
                  <p className="m-0">{config.contact.phone}</p>
                </div>

                <div className="flex items-center justify-center">
                  <Img className="w-[16px] h-[16px] mr-[8px]" src="https://i.imgur.com/NbyQ899.png" alt="Email" />
                  <p className="m-0">{config.contact.email}</p>
                </div>
              </div>

              <div className="flex text-[#999] text-[14px]">
                <p>{config.address}</p>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
