import { axiosInstance } from '@/api/axiosConfig'

export const getAllMeters = async () => {
  try {
    const response = await axiosInstance.get(`/meter/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
export const updateMeter = async (
  id: number,
  isDelete?: boolean,
  name?: string,
  serialNumber?: string,
  installationDate?: string
) => {
  try {
    const response = await axiosInstance.put('/meter/update', {
      id,
      isDelete,
      name,
      serialNumber,
      installationDate
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
