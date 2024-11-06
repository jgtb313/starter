import { UpdateUserPasswordSchema, UpdateUserPasswordInput } from '@ss/schema'
import { Flex, Form, FormProps } from '@ss/components'

import { useUser } from '~/stores'
import { UpdateUserPasswordFormProps } from './UpdateUserPasswordForm.types'
import { UserOverview } from '../UserOverview'

export const UpdateUserPasswordForm = ({ initialValues, user, ...listeners }: UpdateUserPasswordFormProps) => {
  const { updateUserPassword } = useUser()

  const handleSubmit: FormProps<UpdateUserPasswordInput>['onSubmit'] = (values) => {
    updateUserPassword(values, listeners)
  }

  return (
    <Form id="UpdateUserPasswordForm" initialValues={initialValues} schema={UpdateUserPasswordSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <UserOverview user={user} />

          <Form.PasswordInput name="password" label="Senha" placeholder="Digite a nova senha do colaborador" />
        </Flex>
      )}
    </Form>
  )
}
