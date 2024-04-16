<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>{{
            customerData.length > 0 ? customerData[0].name : 'Customer Name'
          }}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            vertical
          >
            <q-tab name="customer" label="Customer info" />
            <q-tab name="sites" label="Sites" />
            <q-tab name="meters" label="Meters" />
            <q-tab name="circuits" label="Circuits" />
          </q-tabs>
          <div class="back">
            <button @click="goBack">Back</button>
          </div>
          <div class="logout">
            <button @click="logout">Logout</button>
          </div>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="/avatar.png" alt="img" /> />
            </q-avatar>
            <div class="text-weight-bold">Agent Name</div>
            <div>@clearvueagent</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container>
        <div class="q-pa-md">
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
          >
            <q-tab-panel name="customer">
              <div class="delete-customer">
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Customer"
                  @click="deleteModalState = true"
                />
              </div>
              <div class="text-h4 q-mb-md">Customer info</div>
              <q-table
                :rows="customerData"
                row-key="name"
                flat
                bordered
                :columns="columnsView.customerColumns"
              >
                <template v-slot:body-cell-action="{ row }">
                  <q-td>
                    <div class="row justify-center">
                      <q-btn @click="handleButtonClick(row)" icon="edit" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="sites">
              <div class="text-h4 q-mb-md">Sites</div>
              <q-table
                :rows="customerSites"
                row-key="name"
                flat
                bordered
                :columns="columnsView.siteColumns"
              >
                <template v-slot:body-cell-action="{ row }">
                  <q-td>
                    <div class="row justify-center">
                      <q-btn @click="handleButtonClick(row)" icon="edit" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="meters">
              <div class="text-h4 q-mb-md">Meters</div>
              <q-table
                :rows="customerMeters"
                row-key="name"
                flat
                bordered
                :columns="columnsView.meterColumns"
              >
                <template v-slot:body-cell-action="{ row }">
                  <q-td>
                    <div class="row justify-center">
                      <q-btn @click="handleButtonClick(row)" icon="edit" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="circuits">
              <div class="text-h4 q-mb-md">Circuits</div>
              <q-table
                :rows="customerCircuits"
                row-key="name"
                flat
                bordered
                :columns="columnsView.circuitColumns"
              >
                <template v-slot:body-cell-action="{ row }">
                  <q-td>
                    <div class="row justify-center">
                      <q-btn @click="handleButtonClick(row)" icon="edit" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page-container>
    </q-layout>
  </div>
  <q-dialog v-model="deleteModalState">
    <q-card>
      <q-card-section class="text-h6">Confirm Deletion</q-card-section>
      <q-card-section>
        {{ `Are you sure you want to delete ${customerData[0].name}  customer ?` }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="deleteModalState = false" />
        <q-btn label="Delete" color="negative" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'
import { Loading } from 'quasar'
import router from '@/router'
import { useRoute } from 'vue-router'
import { columnsView } from '@/helpers/columnsView.ts'
import { getAllCompanyInfo } from '@/api/customersApi.ts'
import { logoutAgent } from '@/api/agentApi.ts'
import { callDeleteRow } from '@/helpers/utils.ts'

const $toast = useToast()

export default {
  computed: {
    columnsView() {
      return columnsView
    }
  },
  setup() {
    const drawer = ref(false)
    const customerData = ref([])
    const customerSites = ref([])
    const customerMeters = ref([])
    const customerCircuits = ref([])
    const tab = ref('customer')
    const deleteModalState = ref(false)

    const route = useRoute()
    const id = +route.query.id

    onMounted(async () => {
      try {
        Loading.show()
        const allInfo = await getAllCompanyInfo(id)
        customerData.value = allInfo.customer || []
        customerSites.value = allInfo.sites || []
        customerMeters.value = allInfo.meters || []
        customerCircuits.value = allInfo.circuits || []
        console.log(allInfo)
        Loading.hide()
        $toast.success('All data is loaded successfully')
      } catch (e) {
        $toast.error(e.response)
        Loading.hide()
      }
    })

    const logout = async () => {
      try {
        await logoutAgent()
        $toast.success('Logged out successfully')
        router.push('/')
      } catch (e) {
        $toast.error(e.response.data)
        router.push('/')
      }
    }

    const confirmDelete = async () => {
      try {
        await callDeleteRow(id, true, 'customer')
        $toast.success('Customer deleted successfully')
        deleteModalState.value = false
        router.push('/home')
      } catch (e) {
        $toast.error(e.response.data)
      }
    }

    const goBack = async () => {
      Loading.show()
      router.push('/home')
      $toast.success('Back home')
      Loading.hide()
    }

    const handleButtonClick = async (props) => {
      console.log(props) //TODO dont forget to add this modal
    }

    return {
      drawer,
      tab,
      logout,
      customerData,
      customerSites,
      customerMeters,
      customerCircuits,
      goBack,
      deleteModalState,
      confirmDelete,
      handleButtonClick
    }
  }
}
</script>

<style scoped>
.back {
  position: fixed;
  left: 10px;
}

.delete-customer {
  display: flex;
  flex-direction: row-reverse;
}
</style>
