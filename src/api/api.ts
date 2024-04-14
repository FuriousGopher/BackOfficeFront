import axios from 'axios'

export const BASE_URL = 'http://localhost:3003'
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

export const getGamaData = async (query = '') => {
  try {
    const response = await instance.get(`/send`, {
      params: { title: query }
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const spinSlotMachine = async () => {
  try {
    const response = await instance.post(
      `/slot-machine/spin`,
      {},
      {
        withCredentials: true
      }
    )
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
