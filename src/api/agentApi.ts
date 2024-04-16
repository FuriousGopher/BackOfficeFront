import { axiosInstance } from '@/api/axiosConfig'

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, data)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const logoutAgent = async () => {
  try {
    const response = await axiosInstance.post(`/auth/logout`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const createNewAgent = async (password: string, email: string) => {
  try {
    const response = await axiosInstance.post(`/admin/create-new-admin`, {
      password: password,
      email: email
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const checkIfAgentEmailExist = async (email: string) => {
  try {
    const response = await axiosInstance.post(`/admin/check-exist`, {
      email
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
