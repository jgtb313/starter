import { useMemo, forwardRef, Ref } from 'react'
import { Flex } from '@mantine/core'
import { DocumentType, DocumentTypeCompany, DocumentTypeEnum } from '@starter/schema'

import { useInputForm } from '../Form.hooks'
import { RadioGroup, RadioGroupProps } from '../RadioGroup'
import { MaskInput, MaskInputProps } from '../MaskInput'
import { DocumentInputProps } from './DocumentInput.types'

const isDocumentIndividual = (value?: string) => (value ? value.replace(/\D/g, '').length < 12 : true)

const CPF_MASK = '000.000.000-00'
const CNPJ_MASK = '00.000.000/0000-00'
const BOTH_MASK = [CPF_MASK, CNPJ_MASK]

export const BaseDocumentInput = (
  {
    name,
    type = 'BOTH',
    defaultType = DocumentTypeEnum.INDIVIDUAL,
    label,
    size = 'md',
    descritive = false,
    exclusive = false,
    onChange,
    onBlur,
    ...props
  }: DocumentInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const inputProps = useInputForm(name)
  const internalValue = inputProps.value?.number ?? ''
  const internalType = useMemo(() => {
    if (!inputProps.value) {
      return defaultType
    }

    return inputProps.value.type as DocumentTypeEnum
  }, [inputProps, type])
  const options = useMemo(() => (descritive ? DocumentTypeCompany.options : DocumentType.options), [descritive])

  const handleChange: MaskInputProps['onChange'] = (value) => {
    onChange?.({
      number: value,
      type: type === 'BOTH' && !exclusive ? (isDocumentIndividual(value) ? DocumentTypeEnum.INDIVIDUAL : DocumentTypeEnum.COMPANY) : internalType,
    })
    inputProps.onChange({
      number: value,
      type: type === 'BOTH' && !exclusive ? (isDocumentIndividual(value) ? DocumentTypeEnum.INDIVIDUAL : DocumentTypeEnum.COMPANY) : internalType,
    })
  }

  const handleBlur: MaskInputProps['onBlur'] = () => {
    inputProps.onBlur({})
    onBlur?.()
  }

  const handleChangeType: RadioGroupProps['onChange'] = (value) => {
    onChange?.({ number: undefined, type: value as DocumentTypeEnum })
    inputProps.onChange({ number: undefined, type: value as DocumentTypeEnum })
  }

  if (exclusive) {
    return (
      <Flex direction="column" gap={12}>
        <RadioGroup name={`${name}.type`} label={label} items={options} onChange={handleChangeType} />

        <MaskInput
          {...props}
          {...inputProps}
          ref={ref}
          name={`${name}.number`}
          mask={internalType === DocumentTypeEnum.INDIVIDUAL ? CPF_MASK : CNPJ_MASK}
          value={internalValue}
          size={size}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Flex>
    )
  }

  return (
    <MaskInput
      {...props}
      {...inputProps}
      ref={ref}
      name={`${name}.number`}
      mask={type === 'BOTH' ? BOTH_MASK : type === 'CPF' ? CPF_MASK : CNPJ_MASK}
      value={internalValue}
      label={label}
      size={size}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export const DocumentInput = forwardRef(BaseDocumentInput)
