import { Button, Flex, SocialIcon } from '@starter/ui'

export const SocialAuthentication = () => {
  return (
    <Flex direction="column" gap={16}>
      <Button variant="default" leftSection={<SocialIcon name="GOOGLE" />}>
        Continue with Google
      </Button>

      <Button variant="default" leftSection={<SocialIcon name="FACEBOOK" />}>
        Continue with Facebook
      </Button>
    </Flex>
  )
}
