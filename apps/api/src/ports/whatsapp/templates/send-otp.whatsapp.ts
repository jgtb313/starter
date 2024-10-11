import { WhatsappSendOTPInput } from '@/ports/whatsapp/Whatsapp.port'

export const SEND_OTP = {
  contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
  contentVariables: (props: WhatsappSendOTPInput) => `{ "1": "${props.code}" }`,
}
