import { Modal, Flex, Button, Divider, Form } from '@starter/ui'

import { SocialAuthentication } from '../SocialAuthentication'

export const AuthenticationForm = () => {
  return (
    <Modal.Content>
      <Modal.Header centered bordered>
        Log in or register
      </Modal.Header>

      <Modal.Body>
        <Flex direction="column" gap={24}>
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
