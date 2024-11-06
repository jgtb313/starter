import { RoleType } from '@ss/schema'
import { Flex, Form } from '@ss/components'

import { useStore } from '~/stores'
import { UserFormProps } from './UserForm.types'

export const UserForm = <T extends {}>({ type, ...props }: UserFormProps<T>) => {
  const { stores } = useStore()

  return (
    <Form id="UserForm" {...props}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="name" label="Nome" placeholder="Digite o nome do colaborador" />

          <Form.Input name="email" label="E-mail" placeholder="Digite o email do colaborador" />

          {type === 'create' && <Form.PasswordInput name="password" label="Senha" placeholder="Digite a senha do colaborador" />}

          {stores?.map((store, index) => (
            <Form.RadioGroup key={index} name={`relationships.${index}.roleId`} type="column" label={store.name} items={RoleType.options} />
          ))}
        </Flex>
      )}
    </Form>
  )
}
