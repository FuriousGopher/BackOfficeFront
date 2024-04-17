import { updateCircuit } from '@/api/circuitsApi'
import { updateCustomer } from '@/api/customersApi'
import { updateSite } from '@/api/sitesApi'
import { updateMeter } from '@/api/metersApi'
import { Dialog } from 'quasar'
import { useToast } from 'vue-toast-notification'

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

const $toast = useToast()

export const confirmDelete = (row: any, name: string) => {
  Dialog.create({
    title: 'Confirm Deleting',
    message: `Are you sure you want to delete ${row.name}?`,
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      class: 'text-negative'
    }
  })
    .onOk(async () => {
      try {
        await callDeleteRow(row.id, true, name)
        window.location.reload()
      } catch (e: any) {
        $toast.error(e.response.data.errorsMessages[0].message)
      }
    })
    .onCancel(() => {})
}
