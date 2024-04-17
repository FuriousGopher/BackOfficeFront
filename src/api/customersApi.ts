import { axiosInstance } from '@/api/axiosConfig'

export const getAllCustomers = async () => {
  try {
    const response = await axiosInstance.get(`/customer/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
export const createNewCustomer = async (name: string, email: string, vatNumber: string) => {
  try {
    const response = await axiosInstance.post(`/customer/create`, {
      name,
      vatNumber,
      email
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const getAllCompanyInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/customer/getAllInfo?id=${id}`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
export const updateCustomer = async (
  id: number,
  isDelete?: boolean,
  name?: string,
  email?: string,
  vat_number?: string
) => {
  try {
    const response = await axiosInstance.put('/customer/update', {
      id,
      isDelete,
      name,
      email,
      vat_number
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
