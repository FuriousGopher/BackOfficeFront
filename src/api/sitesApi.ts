import { axiosInstance } from '@/api/axiosConfig'

export const getAllSites = async () => {
  try {
    const response = await axiosInstance.get(`/site/getAll`)
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
export const updateSite = async (
  id: number,
  isDelete?: boolean,
  name?: string,
  address?: string,
  post_code?: string,
  coordinates?: string
) => {
  try {
    const response = await axiosInstance.put('/site/update', {
      id,
      name,
      address,
      post_code,
      coordinates,
      isDelete
    })
    return await response.data
  } catch (e) {
    throw e as Error
  }
}
