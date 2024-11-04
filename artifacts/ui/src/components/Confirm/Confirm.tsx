import { useDisclosure } from '@mantine/hooks'
import { uuid } from '@starter/shared'

import { Modal, modal } from '../Modal'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { ConfirmStyles } from './Confirm.styles'
import { ConfirmProps } from './Confirm.types'

const Confirm = ({
  modalId,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  closable = true,
  onConfirm,
  onCancel,
  ...props
}: ConfirmProps & { modalId: string }) => {
  const [loading, { open: makeLoading, close: makeUnloading }] = useDisclosure(false)

  const handleConfirm = async () => {
    try {
      makeLoading()
      await onConfirm?.()
      modal.close(modalId)
    } finally {
      makeUnloading()
    }
  }

  const handleCancel = () => {
    modal.close(modalId)
    onCancel?.()
  }

  return (
    <Modal.Content {...props}>
      <Modal.Header closable={closable}>{title}</Modal.Header>

      <Modal.Body>
        <Typography component="span" size="md">
          {description}
        </Typography>
      </Modal.Body>

      <Modal.Footer justify="flex-end" gap={8}>
        <Button variant="default" size="sm" onClick={handleCancel}>
          {cancelLabel}
        </Button>

        <Button size="sm" onClick={handleConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  )
}

export const confirm = (props: ConfirmProps) => {
  const styles = ConfirmStyles(props)
  const modalId = uuid()

  modal.open({
    ...props,
    id: modalId,
    className: styles.root(),
    children: <Confirm {...props} modalId={modalId} />,
    centered: true,
  })
}
