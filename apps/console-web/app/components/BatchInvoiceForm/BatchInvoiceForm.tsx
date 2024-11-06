import { forwardRef, Ref, useImperativeHandle } from 'react'
import { BatchInvoicesFileStatusEnum } from '@ss/schema'
import { Flex, Box, Form, List, ActionButton, Loader, Typography, Icon, toast, useForm, useUpload, FormRenderer, UploadProps } from '@ss/components'

import { useApp, useInvoice } from '~/stores'
import { BatchInvoiceFormSchema, IBatchInvoiceForm, BatchInvoiceFormProps, BatchInvoiceFormRef } from './BatchInvoiceForm.types'

const BaseBatchInvoiceForm = ({ draft, onSubmit, onSuccess }: BatchInvoiceFormProps, ref: Ref<BatchInvoiceFormRef>) => {
  const { store } = useApp()
  const { batchInvoices, loadingBatchInvoice } = useInvoice()
  const form = useForm<IBatchInvoiceForm['initialValues']>()
  const upload = useUpload()

  const initialValues: IBatchInvoiceForm['initialValues'] = {
    storeId: store.id,
    files: []
  }

  const handleUpload: UploadProps['onChange'] = (files) => {
    const values = form.current?.values()
    const prevFiles = values?.files ?? []

    form.current?.append(
      'files',
      files
        .filter((file) => !prevFiles.some((prevFile) => prevFile.filename === file.name))
        .map((file) => ({ file, filename: file.name, message: '-', status: BatchInvoicesFileStatusEnum.PROCESSING }))
    )
  }

  const handleRemoveFile = (index: number) => {
    form.current?.remove('files', index)
  }

  const handleSubmit: IBatchInvoiceForm['onSubmit'] = async (values) => {
    batchInvoices(
      {
        ...values,
        files: values.files.map((file) => file.file)
      },
      {
        onPreFetch: () => {
          onSubmit?.()
        },
        onSuccess: ({ files }) => {
          form.current?.update('files', files)
          onSuccess?.()
        }
      }
    )
  }

  const handleError: IBatchInvoiceForm['onError'] = (errors) => {
    if (errors.files) {
      toast.error({ message: 'Adicione pelo menos um arquivo.' })
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      openUpload: () => {
        upload.current?.open()
      },

      reset: () => {
        form.current?.update('files', [])
      }
    }),
    []
  )

  return (
    <Form
      id="BatchInvoiceForm"
      ref={form}
      initialValues={initialValues}
      schema={BatchInvoiceFormSchema}
      onSubmit={handleSubmit}
      onError={handleError}
    >
      {({ values }: FormRenderer<IBatchInvoiceForm['initialValues']>) => (
        <Flex h="100%" direction="column" justify="space-between" gap={24}>
          <Box w="100%" h="100%">
            <List
              spacing="lg"
              items={values?.files ?? []}
              renderItem={(item, index) => (
                <List.Item
                  title={`${item.filename}`}
                  content={
                    <Typography size="md" c="dimmed">
                      {item.message}
                    </Typography>
                  }
                  endContent={
                    item.status === BatchInvoicesFileStatusEnum.SAVED || item.status === BatchInvoicesFileStatusEnum.ALREADY_SAVED ? (
                      <Icon name="FileCheck" />
                    ) : item.status === BatchInvoicesFileStatusEnum.ERROR ? (
                      <Icon name="FileX" />
                    ) : loadingBatchInvoice ? (
                      <Loader size={30} />
                    ) : (
                      <ActionButton size="xl" onClick={() => handleRemoveFile(index)}>
                        <Icon name="Trash" />
                      </ActionButton>
                    )
                  }
                />
              )}
              emptyMessage="Nenhum arquivo adicionado."
              EmptyIcon="File"
            />
          </Box>

          <Box>
            <Form.Upload
              ref={upload}
              name="uploader"
              title="Carregue ou arraste as notas fiscais aqui"
              description="Anexe quantos arquivos desejar."
              accept={['application/xml', 'text/xml']}
              onChange={handleUpload}
              disabled={!draft}
              multiple
            />
          </Box>
        </Flex>
      )}
    </Form>
  )
}

export const BatchInvoiceForm = forwardRef(BaseBatchInvoiceForm)
