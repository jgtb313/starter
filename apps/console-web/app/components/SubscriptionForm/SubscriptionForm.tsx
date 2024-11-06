import { SubscriptionPaymentMethod, SubscriptionPaymentMethodEnum, DocumentTypeEnum } from '@ss/schema'
import { Flex, Grid, Form, Button, Icon, PaymentIcon, useForm, useDisclosure, FormRenderer, RadioGroupProps } from '@ss/components'
import { getCreditCardName } from '@ss/shared'

import { createCreditCardToken } from '~/support/iugu'
import { useRouter } from '~/hooks'
import { useSubscription } from '~/stores'
import { SubscriptionFormSchema, SubscriptionFormProps } from './SubscriptionForm.types'

export const SubscriptionForm = ({ planId }: SubscriptionFormProps) => {
  const router = useRouter()
  const { createSubscription } = useSubscription()
  const form = useForm<SubscriptionFormProps['initialValues']>()
  const [loading, { open: makeLoading, close: makeUnloading }] = useDisclosure(false)

  const initialValues: SubscriptionFormProps['initialValues'] = {
    planId,
    paymentMethod: SubscriptionPaymentMethodEnum.CREDIT_CARD,
    customer: {
      name: null,
      email: null,
      document: {
        number: null,
        type: DocumentTypeEnum.INDIVIDUAL
      }
    },
    card: {
      number: null,
      holderName: null,
      expirationDate: null,
      cvv: null
    }
  }

  const handlePaymentMethodChange: RadioGroupProps['onChange'] = (value) => {
    const paymentMethod = value as SubscriptionPaymentMethodEnum

    form.current?.update(
      'card',
      paymentMethod === SubscriptionPaymentMethodEnum.CREDIT_CARD
        ? {
            number: '',
            holderName: '',
            expirationDate: '',
            cvv: ''
          }
        : null
    )
  }

  const handleSubmit: SubscriptionFormProps['onSubmit'] = async (values) => {
    makeLoading()

    const cardToken = values.paymentMethod === SubscriptionPaymentMethodEnum.CREDIT_CARD ? await createCreditCardToken(values) : undefined

    createSubscription(
      {
        ...values,
        cardToken
      },
      {
        onSuccess: () => {
          router.push(`/subscription/${planId}/success`)
        },
        onFinally: () => {
          makeUnloading()
        }
      }
    )
  }

  return (
    <Form ref={form} initialValues={initialValues} schema={SubscriptionFormSchema} onSubmit={handleSubmit}>
      {({ values }: FormRenderer<SubscriptionFormProps['initialValues']>) => (
        <Flex direction="column" gap={16}>
          <Form.Input name="customer.name" label="Nome" placeholder="Informe seu nome completo" />

          <Form.Input name="customer.email" label="E-mail" placeholder="Informe seu email" />

          <Form.DocumentInput name="customer.document" label="Documento" placeholder="Informe seu CPF ou CNPJ" />

          <Form.RadioGroup name="paymentMethod" items={SubscriptionPaymentMethod.options} onChange={handlePaymentMethodChange} />

          {values?.paymentMethod === SubscriptionPaymentMethodEnum.CREDIT_CARD && (
            <Grid>
              <Grid.Col span={12}>
                <Form.MaskInput
                  mask="0000 0000 0000 0000"
                  name="card.number"
                  label="Número do cartão"
                  placeholder="Informe o número do cartão"
                  leftSection={
                    values?.card?.number ? (
                      <PaymentIcon name={getCreditCardName(values.card.number)} width={25} height={25} />
                    ) : (
                      <Icon name="CreditCard" width={25} height={25} />
                    )
                  }
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Form.Input name="card.holderName" label="Títular do cartão" placeholder="Nome impresso no cartão" />
              </Grid.Col>

              <Grid.Col span={6}>
                <Form.MaskInput mask="00/00" name="card.expirationDate" label="Data de validade" placeholder="MM/AA (Ex: 12/24)" />
              </Grid.Col>

              <Grid.Col span={6}>
                <Form.MaskInput mask={['000', '0000']} name="card.cvv" label="Código de segurança" placeholder="Informe o CVV (Ex: 151)" />
              </Grid.Col>
            </Grid>
          )}

          <Button type="submit" size="lg" loading={loading} block>
            Assinar agora
          </Button>
        </Flex>
      )}
    </Form>
  )
}
