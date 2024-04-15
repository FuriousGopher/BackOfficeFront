import axios from 'axios'
import type { Ref, UnwrapRef } from 'vue'

export const BASE_URL = 'https://clearvue-back.onrender.com'
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await instance.post(`/auth/login`, data)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllCustomers = async () => {
  try {
    const response = await instance.get(`/customer/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllSites = async () => {
  try {
    const response = await instance.get(`/site/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllMeters = async () => {
  try {
    const response = await instance.get(`/meter/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllCircuits = async () => {
  try {
    const response = await instance.get(`/circuit/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const logoutAgent = async () => {
  try {
    const response = await instance.post(`/auth/logout`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const createNewAgent = async (password: string, email: string) => {
  try {
    const response = await instance.post(`/admin/create-new-admin`, {
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
    const response = await instance.post(`/admin/check-exist`, {
      email
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const createNewCustomer = async (name: string, email: string, vatNumber: string) => {
  try {
    const response = await instance.post(`/customer/create`, {
      name,
      vatNumber,
      email
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const deleteCustomer = async (id: number, isDelete: boolean) => {
  try {
    const response = await instance.put(`/customer/update`, {
      id,
      isDelete
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllCompanyInfo = async (id: number) => {
  try {
    const response = await instance.get(`/customer/getAllInfo?id=${id}`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
