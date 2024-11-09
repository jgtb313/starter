import { Modal, Flex, Button, Divider, Typography, Form } from '@starter/ui'

import { SocialAuthentication } from '../SocialAuthentication'

export const AuthenticationForm = () => {
  return (
    <Modal.Content>
      <Modal.Header>Log in or register</Modal.Header>

      <Modal.Body>
        <Flex w="100%" direction="column" gap={16}>
          <Typography>Welcome to Starter</Typography>

          <Form>
            {() => (
              <Flex>
                <Form.PhoneInput name="email" label="Email" placeholder="Enter yout email" />
              </Flex>
            )}
          </Form>

          <Flex direction="column" justify="flex-end" gap={4}>
            <Button block>Continue</Button>

            <Button variant="transparent">Forgot password?</Button>
          </Flex>

          <Divider label="OR" />

          <SocialAuthentication />
        </Flex>
      </Modal.Body>
    </Modal.Content>
  )
}
