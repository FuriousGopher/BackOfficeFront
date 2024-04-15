<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Customer name</q-toolbar-title>
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
            <q-tab name="customerSites" label="CustomerSites" />
          </q-tabs>
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
              <div class="text-h4 q-mb-md">Customers</div>
              <q-table :rows="customers" row-key="name" flat bordered />
            </q-tab-panel>

            <q-tab-panel name="sites">
              <div class="text-h4 q-mb-md">Sites</div>
              <q-table :rows="sites" row-key="name" flat bordered />
            </q-tab-panel>
            <q-tab-panel name="meters">
              <div class="text-h4 q-mb-md">Meters</div>
              <q-table :rows="meters" row-key="name" flat bordered />
            </q-tab-panel>
            <q-tab-panel name="circuits">
              <div class="text-h4 q-mb-md">Circuits</div>
              <q-table :rows="meters" row-key="name" flat bordered />
            </q-tab-panel>
            <q-tab-panel name="customerSites" v-if="customerData.length > 0">
              <div class="text-h4 q-mb-md">CustomerSites</div>
              <q-table :rows="customerSites" row-key="name" flat bordered />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification'
import { onMounted, reactive, ref } from 'vue'
import { Loading } from 'quasar'
import {
  getAllCircuits,
  getAllCompanyInfo,
  getAllCustomers,
  getAllMeters,
  getAllSites,
  logoutAgent
} from '@/api/api'
import router from '@/router'
import { useRoute } from 'vue-router'

const $toast = useToast()

export default {
  setup() {
    const drawer = ref(false)
    const customers = ref([])
    const meters = ref([])
    const sites = ref([])
    const customerData = ref([])
    const customerSites = ref([])
    const customerMeters = ref([])
    const customerCircuits = ref([])
    const circuits = ref([])
    const tab = ref('customers')
    const state = reactive({ modalOpen: false })

    const route = useRoute()
    const id = route.query.id

    onMounted(async () => {
      try {
        Loading.show()
        const [customersPromise, sitesPromise, metersPromise, circuitsPromise, result] =
          await Promise.allSettled([
            getAllCustomers(),
            getAllSites(),
            getAllMeters(),
            getAllCircuits(),
            getAllCompanyInfo(+id)
          ])
        customers.value = customersPromise.value
        sites.value = sitesPromise.value
        meters.value = metersPromise.value
        circuits.value = circuitsPromise.value
        customerData.value = result.value
        console.log(result.value)
        if (customerData.value) {
          customerSites.value = customerData.value[0].sites || []

          customerMeters.value = customerSites.value.flatMap((site) => site.meters || [])

          customerCircuits.value = customerMeters.value.flatMap((meter) => meter.circuits || [])
        }
        Loading.hide()
        $toast.success('All data is loaded successfully')
      } catch (e) {
        $toast.error(e.response.data)
      }
    })

    const openModal = () => {
      state.modalOpen = true
    }

    const closeModal = () => {
      state.modalOpen = false
    }

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

    return {
      drawer,
      customers,
      tab,
      meters,
      sites,
      circuits,
      state,
      closeModal,
      openModal,
      logout,
      customerData,
      customerSites,
      customerMeters,
      customerCircuits
    }
  }
}
</script>

<style scoped></style>
