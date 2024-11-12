import { Modal, Flex, Button, Divider, Typography, Form } from '@starter/ui'

import { SocialAuthentication } from '../SocialAuthentication'

export const AuthenticationForm = () => {
  return (
    <Modal.Content>
      <Modal.Header size="md" centered bordered>
        Log in or register
      </Modal.Header>

      <Modal.Body>
        <Flex w="100%" direction="column" gap={16}>
          <Typography>Welcome to Starter</Typography>

          <Form>
            {() => (
              <Flex>
                <Form.Input name="email" label="Email" placeholder="Enter your email" />
              </Flex>
            )}
          </Form>

          <Flex direction="column" gap={8}>
            <Button block>Continue</Button>

            <Flex justify="flex-end">
              <Button size="compact-sm" variant="transparent">
                Forgot Password?
              </Button>
            </Flex>
          </Flex>

          <Divider label="OR" />

          <SocialAuthentication />
        </Flex>
      </Modal.Body>
    </Modal.Content>
  )
}
