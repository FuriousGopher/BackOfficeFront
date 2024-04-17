import { axiosInstance } from '@/api/axiosConfig'

export const getAllCircuits = async () => {
  try {
    const response = await axiosInstance.get(`/circuit/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const updateCircuit = async (
  id: number,
  isDelete?: boolean,
  name?: string,
  is_main?: boolean,
  installationDate?: string
) => {
  try {
    const response = await axiosInstance.put('/circuit/update', {
      id,
      isDelete,
      name,
      is_main,
      installationDate
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}

export const createNewCircuit = async (
  id: string,
  name: string,
  is_main: boolean,
  installationDate: Date
) => {
  // @ts-ignore
  const meterId = id.value.toString()
  try {
    const response = await axiosInstance.post(`/circuit/create`, {
      meterId,
      name,
      is_main,
      installationDate
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
