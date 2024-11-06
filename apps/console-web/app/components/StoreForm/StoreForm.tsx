import { Flex, Form } from '@ss/components'

import { StoreFormProps } from './StoreForm.types'

export const StoreForm = <T extends {}>({ ...props }: StoreFormProps<T>) => {
  return (
    <Form id="StoreForm" {...props}>
      {() => (
        <Flex direction="column" gap={16}>
          <Form.Input name="name" label="Nome" placeholder="Digite o nome da loja" />

          <Form.Input name="rcky" label="Código (RCKY)" placeholder="Digite o código rcky da loja" />

          <Form.DocumentInput type="CNPJ" name="document" label="CNPJ" placeholder="Digite o documento da loja" />
        </Flex>
      )}
    </Form>
  )
}
