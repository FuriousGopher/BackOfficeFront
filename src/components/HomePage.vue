<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>ClearVue</q-toolbar-title>
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
            <q-tab name="customers" label="Customers" />
            <q-tab name="sites" label="Sites" />
            <q-tab name="meters" label="Meters" />
            <q-tab name="circuits" label="Circuits" />
          </q-tabs>
          <div class="logout">
            <button @click="logout">Logout</button>
          </div>
          <div class="create-agent">
            <button @click="openAgentModal">Create new agent</button>
          </div>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm"> <img src="/avatar.png" /> /> </q-avatar>
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
            <q-tab-panel name="customers">
              <div class="add-customer">
                <q-btn color="primary" icon="add" label="Customer" @click="openCustomerModal" />
              </div>
              <div class="text-h4 q-mb-md">Customers</div>
              <q-table :rows="customers" row-key="name" flat bordered @row-click="get" />
              <h7>Click on customer to open info</h7>
            </q-tab-panel>

            <q-tab-panel name="sites">
              <div class="text-h4 q-mb-md">Sites</div>
              <q-table
                :rows="sites"
                row-key="name"
                flat
                bordered
                :columns="columnsView.siteColumns"
              >
                <template v-slot:body-cell-action="{ row }">
                  <q-td>
                    <div class="row justify-center">
                      <q-btn @click="openSiteModal(row)" icon="edit" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="meters">
              <div class="text-h4 q-mb-md">Meters</div>
              <q-table
                :rows="meters"
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
                :rows="meters"
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
  <div>
    <RegisterNewAgent :state="stateAgent" />
    <CreateNewCustomer :state="stateCustomer" />
    <UpdateSiteModal :state="stateSite" :modalData="modalData" />
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import {
  getAllCircuits,
  getAllCustomers,
  getAllMeters,
  getAllSites,
  logoutAgent
} from '@/api/api.ts'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from '@/router/index.ts'
import { Loading } from 'quasar'
import RegisterNewAgent from '@/Modals/RegisterNewAgent.vue'
import CreateNewCustomer from '@/Modals/CreateNewCustomer.vue'
import { columnsView } from '@/helpers/columnsView.ts'
import UpdateSiteModal from '@/Modals/UpdateSiteModal.vue'

const $toast = useToast()

export default {
  computed: {
    columnsView() {
      return columnsView
    }
  },
  components: { UpdateSiteModal, CreateNewCustomer, RegisterNewAgent },
  setup() {
    const drawer = ref(false)
    const customers = ref([])
    const meters = ref([])
    const sites = ref([])
    const circuits = ref([])
    const tab = ref('customers')
    const stateAgent = reactive({ modalOpen: false })
    const stateCustomer = reactive({ modalOpen: false })
    const stateSite = reactive({ modalOpen: false })
    const modalData = ref(null)

    onMounted(async () => {
      try {
        Loading.show()
        const [customersPromise, sitesPromise, metersPromise, circuitsPromise] =
          await Promise.allSettled([
            getAllCustomers(),
            getAllSites(),
            getAllMeters(),
            getAllCircuits()
          ])
        customers.value = customersPromise.value
        sites.value = sitesPromise.value
        meters.value = metersPromise.value
        circuits.value = circuitsPromise.value
        Loading.hide()
        $toast.success('All data is loaded successfully')
      } catch (e) {
        $toast.error(e.response.data)
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

    const get = async (_props, row) => {
      try {
        router.push({ path: '/company', query: { id: row.id } })
      } catch (e) {
        $toast.error(e)
      }
    }

    const openAgentModal = () => {
      stateAgent.modalOpen = true
    }

    const openSiteModal = (data) => {
      modalData.value = data
      stateSite.modalOpen = true
    }

    const openCustomerModal = () => {
      stateCustomer.modalOpen = true
    }

    const closeModal = () => {
      stateCustomer.modalOpen = false
      stateAgent.modalOpen = false
      stateSite.modalOpen = false
    }

    const handleButtonClick = async (props) => {
      console.log(props)
    }

    return {
      drawer,
      customers,
      logout,
      tab,
      get,
      meters,
      sites,
      circuits,
      closeModal,
      openAgentModal,
      openCustomerModal,
      stateCustomer,
      stateAgent,
      handleButtonClick,
      openSiteModal,
      stateSite,
      modalData
    }
  }
}
</script>

<style>
.logout {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.create-agent {
  position: fixed;
  bottom: 50px;
  left: 10px;
}

button {
  padding: 8px;
  border: none;
  width: 180px;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.add-customer {
  display: flex;
  flex-direction: row-reverse;
}
</style>
