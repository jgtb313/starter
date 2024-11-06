import { Flex, Form, Button } from '@ss/components'

import { useRouter } from '~/hooks'
import { useAuth } from '~/stores'
import { AccountActivationFormSchema, AccountActivationFormProps, IAccountActivationForm } from './AccountActivationForm.types'

export const AccountActivationForm = ({ accountActivationToken }: AccountActivationFormProps) => {
  const router = useRouter()
  const { accountActivation, loadingAccountActivation } = useAuth()

  const initialValues: IAccountActivationForm['initialValues'] = { accountActivationToken, password: null }

  const handleSubmit: IAccountActivationForm['onSubmit'] = (values) => {
    accountActivation(
      {
        ...values,
        recaptcha: ''
      },
      {
        onSuccess: () => {
          router.push('/sign-in')
        }
      }
    )
  }

  return (
    <Form initialValues={initialValues} schema={AccountActivationFormSchema} onSubmit={handleSubmit}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.PasswordInput name="password" label="Senha" placeholder="Digite a sua senha" />

          <Form.PasswordInput name="confirmPassword" label="Confirme a senha" placeholder="Confirme a sua senha" />

          <Button type="submit" size="lg" loading={loadingAccountActivation} block data-testid="submit">
            Ativar
          </Button>
        </Flex>
      )}
    </Form>
  )
}
