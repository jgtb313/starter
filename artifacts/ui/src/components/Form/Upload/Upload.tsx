import { forwardRef, useRef, useImperativeHandle, Ref } from 'react'
import { Flex, Group, Text } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'

import { Icon } from '../../Icon'
import { useInputForm } from '../Form.hooks'
import { UploadStyles } from './Upload.styles'
import { UploadProps, UploadRef } from './Upload.types'

const BaseUpload = ({ name, title, description, onChange, ...props }: UploadProps, ref: Ref<UploadRef>) => {
  const inputRef = useRef<() => void | undefined>(null)
  const inputProps = useInputForm(name)
  const styles = UploadStyles(props)

  const handleOnDrop = (value: FileWithPath[]) => {
    inputProps.onChange(value)
    onChange?.(value)
  }

  const handleBlur = () => {
    inputProps.onBlur()
  }

  useImperativeHandle(ref, () => ({
    open: () => inputRef.current?.()
  }))

  return (
    <Dropzone {...props} {...inputProps} openRef={inputRef} classNames={{ root: styles.root() }} onDrop={handleOnDrop} onBlur={handleBlur}>
      <Group style={{ pointerEvents: 'none' }} justify="center" gap="xl" mih={140}>
        <Dropzone.Accept>
          <Icon name="Upload" width={52} height={52} strokeWidth={1.5} />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <Icon name="X" width={52} height={52} strokeWidth={1.5} />
        </Dropzone.Reject>

        <Dropzone.Idle>
          <Icon name="Image" width={52} height={52} strokeWidth={1.5} />
        </Dropzone.Idle>

        <Flex direction="column" justify="center" align="center">
          <Text size="xl" inline>
            {title}
          </Text>

          {description && (
            <Text size="md" c="dimmed" mt={12} inline>
              {description}
            </Text>
          )}
        </Flex>
      </Group>
    </Dropzone>
  )
}

export const Upload = forwardRef(BaseUpload)
