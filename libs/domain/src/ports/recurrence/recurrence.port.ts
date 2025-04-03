export type IRecurrenceAdapter = {}

export type RecurrenceCreateInput = {}
export type RecurrenceCreateOutput = { recurrenceId: string }

export type RecurrenceChangePaymentMethodInput = {}
export type RecurrenceChangePaymentMethodOutput = { recurrenceId: string }

export type RecurrenceChangePlanInput = {}
export type RecurrenceChangePlanOutput = { recurrenceId: string }

export type RecurrenceCancelInput = {}
export type RecurrenceCancelOutput = { recurrenceId: string }

export type IRecurrence = {
  create: (input: RecurrenceCreateInput) => Promise<RecurrenceCreateOutput>
  changePaymentMethod: (input: RecurrenceChangePaymentMethodInput) => Promise<RecurrenceChangePaymentMethodOutput>
  changePlan: (input: RecurrenceChangePlanInput) => Promise<RecurrenceChangePlanOutput>
  cancel: (input: RecurrenceCancelInput) => Promise<RecurrenceCancelOutput>
}
