import { checkIfAgentEmailExist } from '@/api/agentApi'

export const emailRule = (value: string) => {
  const emailRegex = /\S+@\S+\.\S+/
  return emailRegex.test(value) || 'Invalid email.'
}

export const passwordRule = (value: string) => {
  return value.length >= 6 || 'Password must be at least 6 characters long.'
}

export const checkEmailExist = async (value: string) => {
  const result = await checkIfAgentEmailExist(value)
  return !result || 'Agent with this email already registered'
}
