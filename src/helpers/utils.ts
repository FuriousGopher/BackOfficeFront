import { updateCircuit } from '@/api/circuitsApi'
import { updateCustomer } from '@/api/customersApi'
import { updateSite } from '@/api/sitesApi'
import { updateMeter } from '@/api/metersApi'

export const callDeleteRow = async (id: number, isDelete: boolean, name: string) => {
  switch (name) {
    case 'customer':
      return await updateCustomer(id, isDelete)
    case 'site':
      return await updateSite(id, isDelete)
    case 'meter':
      return await updateMeter(id, isDelete)
    case 'circuit':
      return await updateCircuit(id, isDelete)
    default:
      throw new Error('Unknown row name')
  }
}
