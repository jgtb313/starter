import {
	Select as ShadcnSelect,
	SelectContent as ShadcnSelectContent,
	SelectGroup as ShadcnSelectGroup,
	SelectItem as ShadcnSelectItem,
	SelectLabel as ShadcnSelectLabel,
	SelectScrollDownButton as ShadcnSelectScrollDownButton,
	SelectScrollUpButton as ShadcnSelectScrollUpButton,
	SelectSeparator as ShadcnSelectSeparator,
	SelectTrigger as ShadcnSelectTrigger,
	SelectValue as ShadcnSelectValue,
} from '@/shadcn/select/select'

export const SelectRoot = ShadcnSelect
export const SelectGroup = ShadcnSelectGroup
export const SelectValue = ShadcnSelectValue
export const SelectTrigger = ShadcnSelectTrigger
export const SelectContent = ShadcnSelectContent
export const SelectLabel = ShadcnSelectLabel
export const SelectItem = ShadcnSelectItem
export const SelectSeparator = ShadcnSelectSeparator
export const SelectScrollUpButton = ShadcnSelectScrollUpButton
export const SelectScrollDownButton = ShadcnSelectScrollDownButton

export const Select = Object.assign(SelectRoot, {
	Group: SelectGroup,
	Value: SelectValue,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Label: SelectLabel,
	Item: SelectItem,
	Separator: SelectSeparator,
	ScrollUpButton: SelectScrollUpButton,
	ScrollDownButton: SelectScrollDownButton,
})
