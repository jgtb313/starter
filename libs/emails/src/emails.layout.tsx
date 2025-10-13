import { config } from '@starter/config'

import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'
import type { PropsWithChildren } from 'react'

type LayoutProps = {
	title: string
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
	return (
		<Html>
			<Head />

			<Tailwind>
				<Body className='mx-auto my-auto bg-white px-2 font-sans'>
					<Container className='mx-auto my-[40px] max-w-[465px] rounded border border-gray-300 border-solid p-[20px]'>
						<Img
							className='mx-auto block'
							src={config.logo.light}
							alt='Logo'
						/>

						<Heading className='mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black'>
							{title}
						</Heading>

						{children}

						<Hr className='mx-0 my-[26px] w-full border border-gray-300 border-solid' />

						<Section>
							<Row
								width={90}
								align='center'
							>
								<Column className='pr-[8px]'>
									{config.social.facebook && (
										<Link href={config.social.facebook}>
											<Img
												src='https://i.imgur.com/ess1JW0.png'
												alt='Facebook'
												width={30}
												height={30}
											/>
										</Link>
									)}
								</Column>

								<Column className='pr-[8px]'>
									{config.social.twitter && (
										<Link href={config.social.twitter}>
											<Img
												src='https://i.imgur.com/DsoTAYE.png'
												alt='Twitter'
												width={30}
												height={30}
											/>
										</Link>
									)}
								</Column>

								<Column className='pr-[8px]'>
									{config.social.instagram && (
										<Link href={config.social.instagram}>
											<Img
												src='https://i.imgur.com/A46ahq8.png'
												alt='Instagram'
												width={30}
												height={30}
											/>
										</Link>
									)}
								</Column>
							</Row>

							<Row>
								<Text className='mt-4 mb-2 text-center text-gray-500 text-xs leading-[18px]'>
									© {new Date().getFullYear()} {config.name}. All Rights
									Reserved.
								</Text>

								<Text className='m-0 text-center text-gray-500 text-xs leading-[18px]'>
									{config.address}
								</Text>
							</Row>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
