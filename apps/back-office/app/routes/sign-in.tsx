import type { Route } from './+types/home'

import { Flex, Center, Card, Text, Anchor, Divider, Brand, Button, RiGoogleFill, RiTwitterXFill, RiAppleFill, RiFacebookFill } from '@starter/ui-web'

import { SignInForm, SocialAuthForm } from '~/components'

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Starter | Sign In' }]
}

const Page = () => {
  return (
    <Flex direction="column" gap="lg">
      <Center>
        <Brand type="full" size={60} />
      </Center>

      <Card miw={450} withBorder>
        <Flex direction="column" align="center" gap="xs" p={6}>
          <Text size="lg" fw={500}>
            Sign In
          </Text>

          <Text size="sm" c="dimmed">
            Continue with your Starter account
          </Text>
        </Flex>

        <Card.Section my="md">
          <Divider />
        </Card.Section>

        <Flex direction="column" gap="md" p={6}>
          <SignInForm />

          <Flex direction="column" gap="md">
            <Divider label="OR" />

            <SocialAuthForm />
          </Flex>

          <Flex direction="column" align="center" gap="xs" mt="sm">
            <Text size="sm">
              Don't have an account?{' '}
              <Anchor size="sm" fw={500} underline="never">
                Sign Up
              </Anchor>
            </Text>

            <Anchor size="sm" fw={500} underline="never">
              Forgot yout password?
            </Anchor>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
